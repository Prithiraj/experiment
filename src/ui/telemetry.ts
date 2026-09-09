type Cleanup = () => void;

interface GravityReading {
  selector: string;
  scene: string;
  value: string;
  meter: number;
}

const readings: GravityReading[] = [
  { selector: '[data-scene="release"]', scene: '01 / EARTH', value: '1.00g', meter: 1 },
  { selector: '[data-scene="field"]', scene: '02 / DRIFT', value: '0.18g', meter: 0.18 },
  { selector: '[data-scene="orbit"]', scene: '03 / ORBIT', value: '0.04g', meter: 0.04 },
  { selector: '[data-scene="horizontal"]', scene: '04 / AXIS LOST', value: '0.01g', meter: 0.01 },
  { selector: '[data-scene="vortex"]', scene: '05 / COLLAPSE', value: '∞g', meter: 1 },
  { selector: '[data-scene="return"]', scene: '06 / RETURN', value: '1.00g', meter: 1 },
];

export function initGravityTelemetry(): Cleanup {
  const hud = document.querySelector<HTMLElement>('[data-gravity-hud]');
  const sceneNode = hud?.querySelector<HTMLElement>('[data-gravity-scene]');
  const valueNode = hud?.querySelector<HTMLElement>('[data-gravity-value]');
  const meterNode = hud?.querySelector<HTMLElement>('[data-gravity-meter]');
  if (!hud || !sceneNode || !valueNode || !meterNode || !('IntersectionObserver' in window)) return () => undefined;

  const entries = readings
    .map((reading) => ({ reading, element: document.querySelector<HTMLElement>(reading.selector) }))
    .filter((entry): entry is { reading: GravityReading; element: HTMLElement } => entry.element !== null);

  const apply = (reading: GravityReading) => {
    sceneNode.textContent = reading.scene;
    valueNode.textContent = reading.value;
    meterNode.style.width = `${Math.max(3.5, reading.meter * 100)}%`;
    hud.dataset.scene = reading.scene.split('/')[0]?.trim() ?? '';
  };

  apply(readings[0] ?? { selector: '', scene: '01 / EARTH', value: '1.00g', meter: 1 });

  const observer = new IntersectionObserver(
    (observed) => {
      const centered = observed
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top + a.boundingClientRect.height / 2 - window.innerHeight / 2) - Math.abs(b.boundingClientRect.top + b.boundingClientRect.height / 2 - window.innerHeight / 2))[0];
      if (!centered) return;
      const match = entries.find((entry) => entry.element === centered.target);
      if (match) apply(match.reading);
    },
    { rootMargin: '-44% 0px -44% 0px', threshold: 0 },
  );

  entries.forEach(({ element }) => observer.observe(element));
  return () => observer.disconnect();
}
