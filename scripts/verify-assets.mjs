import { createHash } from 'node:crypto';
import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const productionRoot = path.join(repoRoot, 'assets', 'production');
const manifestPath = path.join(productionRoot, 'manifest.json');
const requireSources = process.argv.includes('--require-sources');
const errors = [];
const warnings = [];

function addError(message) {
  errors.push(message);
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function sha256(filePath) {
  const contents = await readFile(filePath);
  return createHash('sha256').update(contents).digest('hex');
}

function parsePng(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.subarray(0, 8).toString('hex') !== signature || buffer.length < 33) {
    throw new Error('invalid PNG signature or truncated IHDR');
  }

  const colorType = buffer[25];
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    alpha: colorType === 4 || colorType === 6 || buffer.includes(Buffer.from('tRNS')),
  };
}

function readUInt24LE(buffer, offset) {
  return buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16);
}

function parseWebp(buffer) {
  if (
    buffer.length < 20 ||
    buffer.subarray(0, 4).toString('ascii') !== 'RIFF' ||
    buffer.subarray(8, 12).toString('ascii') !== 'WEBP'
  ) {
    throw new Error('invalid WebP container');
  }

  let width;
  let height;
  let alpha = false;
  let offset = 12;

  while (offset + 8 <= buffer.length) {
    const type = buffer.subarray(offset, offset + 4).toString('ascii');
    const size = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;

    if (dataOffset + size > buffer.length) throw new Error(`truncated ${type} chunk`);

    if (type === 'VP8X' && size >= 10) {
      alpha ||= Boolean(buffer[dataOffset] & 0x10);
      width = readUInt24LE(buffer, dataOffset + 4) + 1;
      height = readUInt24LE(buffer, dataOffset + 7) + 1;
    } else if (type === 'ALPH') {
      alpha = true;
    } else if (type === 'VP8 ' && size >= 10 && width === undefined) {
      width = buffer.readUInt16LE(dataOffset + 6) & 0x3fff;
      height = buffer.readUInt16LE(dataOffset + 8) & 0x3fff;
    } else if (type === 'VP8L' && size >= 5 && width === undefined) {
      if (buffer[dataOffset] !== 0x2f) throw new Error('invalid VP8L signature');
      const bits = buffer.readUInt32LE(dataOffset + 1);
      width = (bits & 0x3fff) + 1;
      height = ((bits >>> 14) & 0x3fff) + 1;
      alpha ||= Boolean(bits & 0x10000000);
    }

    offset = dataOffset + size + (size % 2);
  }

  if (width === undefined || height === undefined) throw new Error('missing WebP dimensions');
  return { width, height, alpha };
}

function parseImage(buffer, filePath) {
  if (filePath.endsWith('.png')) return parsePng(buffer);
  if (filePath.endsWith('.webp')) return parseWebp(buffer);
  throw new Error('unsupported production image type');
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const child = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(child)));
    else files.push(child);
  }

  return files;
}

function normalize(filePath) {
  return filePath.split(path.sep).join('/');
}

async function verifyFile(record, ownerId, knownPaths) {
  const relativePath = record?.path;
  if (!relativePath || typeof relativePath !== 'string') {
    addError(`${ownerId}: image record is missing a path`);
    return;
  }

  if (path.isAbsolute(relativePath) || relativePath.includes('..')) {
    addError(`${ownerId}: unsafe production path ${relativePath}`);
    return;
  }

  if (knownPaths.has(relativePath)) addError(`${ownerId}: duplicate manifest path ${relativePath}`);
  knownPaths.add(relativePath);

  const absolutePath = path.join(productionRoot, relativePath);
  if (!(await exists(absolutePath))) {
    addError(`${ownerId}: missing ${relativePath}`);
    return;
  }

  const [buffer, details] = await Promise.all([readFile(absolutePath), stat(absolutePath)]);
  let image;
  try {
    image = parseImage(buffer, relativePath);
  } catch (error) {
    addError(`${ownerId}: ${relativePath}: ${error.message}`);
    return;
  }

  if (record.width !== image.width || record.height !== image.height) {
    addError(
      `${ownerId}: ${relativePath}: dimensions ${image.width}x${image.height}, manifest ${record.width}x${record.height}`,
    );
  }
  if (record.alpha !== image.alpha) {
    addError(`${ownerId}: ${relativePath}: alpha=${image.alpha}, manifest alpha=${record.alpha}`);
  }
  if (record.bytes !== details.size) {
    addError(`${ownerId}: ${relativePath}: ${details.size} bytes, manifest ${record.bytes}`);
  }

  const actualHash = createHash('sha256').update(buffer).digest('hex');
  if (record.sha256 !== actualHash) {
    addError(`${ownerId}: ${relativePath}: SHA-256 does not match manifest`);
  }

  if (record.budgetBytes && details.size > record.budgetBytes && !record.budgetException) {
    addError(`${ownerId}: ${relativePath}: exceeds ${record.budgetBytes}-byte budget`);
  }
}

async function verifySource(asset) {
  const source = asset.source;
  if (!source?.kind) {
    addError(`${asset.id}: missing source provenance`);
    return;
  }

  if (!source.path) return;
  const sourcePath = path.join(repoRoot, source.path);
  const sourceExists = await exists(sourcePath);

  if (!sourceExists) {
    if (requireSources || source.kind !== 'archive-direct') addError(`${asset.id}: missing source ${source.path}`);
    else warnings.push(`${asset.id}: local-only archive source is unavailable; manifest hash retained`);
    return;
  }

  if (!source.sha256) {
    addError(`${asset.id}: source path has no SHA-256`);
    return;
  }

  const actualHash = await sha256(sourcePath);
  if (actualHash !== source.sha256) addError(`${asset.id}: source SHA-256 does not match ${source.path}`);
  if (source.kind === 'archive-direct' && asset.master?.sha256 !== source.sha256) {
    addError(`${asset.id}: archive-direct master is not byte-identical to its source`);
  }
}

function parseRuntimeAssets(source) {
  const imports = new Map();
  const importPattern = /import\s+([A-Za-z_$][\w$]*)\s+from\s+['"]\.\.\/assets\/production\/([^'"]+)['"]/g;
  for (const match of source.matchAll(importPattern)) imports.set(match[1], match[2]);

  const objectMatch = source.match(/export const productionAssets\s*=\s*\{([\s\S]*?)\}\s*as const/);
  if (!objectMatch) throw new Error('productionAssets object was not found');

  const runtime = new Map();
  for (const rawEntry of objectMatch[1].split(',')) {
    const entry = rawEntry.trim();
    if (!entry) continue;
    const match = entry.match(/^([A-Za-z_$][\w$]*)(?:\s*:\s*([A-Za-z_$][\w$]*))?$/);
    if (!match) throw new Error(`unsupported productionAssets entry: ${entry}`);
    const key = match[1];
    const variable = match[2] ?? key;
    const importedPath = imports.get(variable);
    if (!importedPath) throw new Error(`${key} uses unknown import ${variable}`);
    runtime.set(key, importedPath);
  }

  return { imports, runtime };
}

async function verifyRuntime(manifest, knownPaths) {
  const assetSourcePath = path.join(repoRoot, 'src', 'assets.ts');
  const assetSource = await readFile(assetSourcePath, 'utf8');
  let parsed;
  try {
    parsed = parseRuntimeAssets(assetSource);
  } catch (error) {
    addError(`src/assets.ts: ${error.message}`);
    return;
  }

  for (const [variable, importedPath] of parsed.imports) {
    if (!knownPaths.has(importedPath)) addError(`src/assets.ts: ${variable} imports unmanifested ${importedPath}`);
    if (!/\.(webp|avif)$/.test(importedPath)) addError(`src/assets.ts: ${variable} imports non-optimized ${importedPath}`);
  }

  const manifestRuntime = new Map();
  for (const asset of manifest.assets) {
    if (!asset.runtime) continue;
    if (manifestRuntime.has(asset.runtime.key)) addError(`duplicate runtime key ${asset.runtime.key}`);
    manifestRuntime.set(asset.runtime.key, asset.runtime.path);
    if (!asset.derivatives.some((derivative) => derivative.path === asset.runtime.path)) {
      addError(`${asset.id}: runtime path is not one of its derivatives`);
    }
  }

  for (const [key, importedPath] of parsed.runtime) {
    if (!manifestRuntime.has(key)) addError(`src/assets.ts: runtime key ${key} is absent from the manifest`);
    else if (manifestRuntime.get(key) !== importedPath) {
      addError(`src/assets.ts: runtime key ${key} resolves to ${importedPath}, manifest ${manifestRuntime.get(key)}`);
    }
  }
  for (const [key] of manifestRuntime) {
    if (!parsed.runtime.has(key)) addError(`manifest runtime key ${key} is absent from productionAssets`);
  }

  const html = await readFile(path.join(repoRoot, 'index.html'), 'utf8');
  const htmlKeys = new Set([...html.matchAll(/data-production-image=['"]([^'"]+)['"]/g)].map((match) => match[1]));
  for (const key of htmlKeys) {
    if (!parsed.runtime.has(key)) addError(`index.html: unknown data-production-image key ${key}`);
  }

  const scanTargets = [path.join(repoRoot, 'src'), path.join(repoRoot, 'index.html')];
  const sourceFiles = [];
  for (const target of scanTargets) {
    const details = await stat(target);
    sourceFiles.push(...(details.isDirectory() ? await walk(target) : [target]));
  }
  for (const filePath of sourceFiles) {
    const source = await readFile(filePath, 'utf8');
    if (/assets\/reference|conversation-archive|asset-board|visual-direction|homepage-concept/.test(source)) {
      addError(`${normalize(path.relative(repoRoot, filePath))}: prohibited reference-asset token in runtime source`);
    }
  }
}

async function main() {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  if (manifest.schemaVersion !== 2) addError(`unsupported manifest schemaVersion ${manifest.schemaVersion}`);
  if (!Array.isArray(manifest.assets)) addError('manifest assets must be an array');

  const knownIds = new Set();
  const knownPaths = new Set();
  const allowedStatuses = new Set(['approved', 'integrated', 'retired']);

  for (const asset of manifest.assets ?? []) {
    if (!asset.id) addError('manifest asset is missing an id');
    else if (knownIds.has(asset.id)) addError(`duplicate asset id ${asset.id}`);
    else knownIds.add(asset.id);

    if (!allowedStatuses.has(asset.status)) addError(`${asset.id}: invalid status ${asset.status}`);
    if (asset.status === 'integrated' && !asset.runtime) addError(`${asset.id}: integrated asset has no runtime mapping`);
    if (asset.status === 'approved' && asset.runtime) addError(`${asset.id}: approved asset must become integrated before runtime use`);
    if (!asset.role || !asset.category || !Array.isArray(asset.scenes) || asset.scenes.length === 0) {
      addError(`${asset.id}: missing category, role, or scene ownership`);
    }
    if (!Array.isArray(asset.derivatives) || asset.derivatives.length === 0) {
      addError(`${asset.id}: requires at least one derivative`);
      continue;
    }

    await verifySource(asset);
    await verifyFile(asset.master, asset.id, knownPaths);
    for (const derivative of asset.derivatives) await verifyFile(derivative, asset.id, knownPaths);
  }

  const actualFiles = (await walk(productionRoot))
    .filter((filePath) => /\.(png|webp|avif)$/i.test(filePath))
    .map((filePath) => normalize(path.relative(productionRoot, filePath)));
  for (const filePath of actualFiles) {
    if (!knownPaths.has(filePath)) addError(`unmanifested production image ${filePath}`);
  }
  for (const filePath of knownPaths) {
    if (!actualFiles.includes(filePath)) addError(`manifest path is not a production image ${filePath}`);
  }

  await verifyRuntime(manifest, knownPaths);

  for (const warning of warnings) console.warn(`warning: ${warning}`);
  if (errors.length) {
    for (const error of errors) console.error(`error: ${error}`);
    console.error(`Asset verification failed with ${errors.length} error(s).`);
    process.exitCode = 1;
    return;
  }

  const derivativeBytes = manifest.assets.reduce(
    (total, asset) => total + asset.derivatives.reduce((sum, derivative) => sum + derivative.bytes, 0),
    0,
  );
  console.log(
    `Asset verification passed: ${manifest.assets.length} assets, ${knownPaths.size} files, ${derivativeBytes} derivative bytes, ${manifest.assets.filter((asset) => asset.runtime).length} runtime keys.`,
  );
}

await main();
