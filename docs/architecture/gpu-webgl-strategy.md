# GPU and WebGL Strategy for Zero-G Bloom

## Decision summary

Zero-G Bloom does **not** require WebGL to deliver its core experience.

The preferred commercial architecture is:

```text
HTML / semantic commerce UI
+
photographic AVIF/WebP layers
+
CSS transforms
+
GSAP / ScrollTrigger
+
optional WebGL enhancement for one or two signature scenes
```

The browser may use GPU compositing internally for transformed DOM layers. That does **not** mean the application needs to program the GPU directly through WebGL.

The core storefront must remain fully usable without WebGL.

---

## 1. GPU acceleration is not the same thing as WebGL

A normal browser page can already benefit from hardware-accelerated compositing when we animate properties such as:

- `transform`
- `opacity`
- `translate3d()`
- `scale()`
- `rotate()`

In this model, the browser manages rendering and compositing for us.

WebGL is a different architectural choice. It gives the application direct control over a canvas-based graphics pipeline: textures, geometry, shaders, buffers, draw calls, framebuffers, camera projection, and render loops.

For Zero-G Bloom, most of the visual language does not need that level of control.

---

## 2. WebGL should be progressive enhancement

WebGL support is broad across modern consumer browsers, but it should never be treated as universally guaranteed.

Availability can depend on more than the browser version. Hardware, graphics drivers, operating-system configuration, enterprise policy, power-saving behavior, and browser safety decisions can affect whether a WebGL context is available.

The architecture should therefore be:

```text
normal HTML experience
        |
        +-- WebGL available and suitable? -- yes --> enhanced scene
        |
        +-- no ------------------------------------> DOM/GSAP fallback
```

Conceptually:

```js
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');

if (gl) {
  initEnhancedScene();
} else {
  initDomScene();
}
```

The site must never become a blank canvas or unusable storefront because WebGL is unavailable.

---

## 3. WebGL contexts can be lost

A WebGL context is not necessarily permanent for the lifetime of a page.

Contexts can be lost because of GPU resets, device switching, memory pressure, driver problems, or the browser reclaiming graphics resources.

A robust implementation must either:

1. restore the WebGL scene, or
2. fall back to the DOM implementation.

For a commercial storefront, the second option is essential. A graphics failure must never block navigation, product information, cart access, or checkout.

---

## 4. Is WebGL heavier?

Not automatically.

A better rule is:

> WebGL has a higher implementation and rendering-management cost, but can be dramatically more efficient for workloads that suit GPU batching and shaders.

### DOM/GSAP is excellent for

- tens of photographic flowers;
- typography;
- hero compositions;
- product cards;
- orbital product layouts;
- scroll-driven translation, rotation, and scale;
- small numbers of petals;
- the commerce interface.

### WebGL is excellent for

- hundreds or thousands of particles;
- true camera depth;
- large sprite fields;
- shader-based image distortion;
- refraction and lensing;
- fluid/ripple effects;
- procedural particles;
- texture warping;
- large-scale particle explosions;
- complex depth effects.

A DOM scene with 20 transformed images can be simpler and more appropriate than a WebGL renderer.

A scene with 2,000 individually moving petals is a much stronger WebGL candidate than 2,000 DOM nodes.

---

## 5. The main performance risk may be images, not WebGL

Compressed download size and decoded graphics memory are different things.

For example, an image decoded as 4000 x 4000 RGBA occupies approximately:

```text
4000 x 4000 x 4 bytes
≈ 64 MB
```

That can be true even when its AVIF or WebP network transfer is only a fraction of that size.

A collection of oversized transparent flower assets can therefore become expensive regardless of whether they are rendered as DOM images or uploaded as WebGL textures.

Commercial image integration should prioritize:

- correct source dimensions;
- responsive image variants;
- mobile-specific crops;
- limited simultaneous actor counts;
- lazy loading;
- reuse of assets between scenes;
- measured decoded-memory and GPU-memory budgets.

The first optimization question should often be:

> Are we loading the right-size images?

not:

> Should this be WebGL?

---

## 6. Why mobile changes the decision

The consumer audience may include:

- high-end desktop GPUs;
- integrated laptop GPUs;
- current flagship phones;
- older iPhones;
- inexpensive Android devices;
- devices under thermal pressure;
- battery-saving modes;
- low-memory conditions.

An effect that looks excellent at 120 fps on a workstation but runs poorly on a normal phone is not a good commercial effect.

Graphics cost affects more than frame rate:

- battery consumption;
- device temperature;
- memory pressure;
- browser stability;
- scroll responsiveness;
- overall perceived quality.

Mobile should therefore receive fewer actors, lower internal rendering resolution when appropriate, simpler effects, and shorter high-intensity scenes.

---

## 7. Recommended Zero-G Bloom split

Directionally, the site should remain mostly DOM based:

```text
Zero-G Bloom
     |
     +-- DOM / CSS / GSAP: primary architecture
     |
     +-- WebGL: optional signature enhancement
```

### Keep in DOM / GSAP

- navigation;
- hero typography;
- photographic flower layers;
- release-gravity choreography;
- normal zero-G drift with moderate actor counts;
- orbital products;
- horizontal axis section;
- product cards;
- gravity-return transition;
- shop;
- cart;
- forms;
- testimonials;
- footer.

### Potential WebGL candidates

#### Candidate A — deep zero-G field

A high-end version could turn a small DOM field into a much denser volume of petals and floral fragments with real z-depth and camera movement.

#### Candidate B — gravity vortex

This is the strongest candidate.

The DOM version can continue to handle attraction and collapse. WebGL could enhance the climax with effects that CSS cannot reproduce convincingly:

- gravitational texture stretching;
- lensing;
- image warping;
- refraction;
- particle disintegration;
- curved trajectories through real z-space.

The existing DOM vortex remains the fallback.

---

## 8. Do not rebuild the whole site in Three.js

A full WebGL website would create unnecessary complexity for normal commerce behavior.

The recommended architecture is closer to:

```text
HTML page
  |
  +-- DOM hero
  +-- GSAP release
  +-- GSAP zero-G
  +-- GSAP orbital collection
  +-- GSAP horizontal world
  |
  +-- optional WebGL vortex canvas
  |
  +-- DOM gravity return
  +-- DOM shop
  +-- DOM cart
  +-- DOM footer
```

Commerce should remain native HTML so accessibility, text selection, keyboard behavior, browser navigation, SEO, forms, and application state do not depend on a graphics engine.

---

## 9. GSAP remains the director

If WebGL is introduced, it should not create a second independent storytelling system.

GSAP / ScrollTrigger should remain responsible for scroll progress and scene choreography.

The WebGL layer becomes a renderer that consumes a normalized animation state.

Conceptually:

```js
const state = { gravity: 0 };

gsap.to(state, {
  gravity: 1,
  scrollTrigger: {
    trigger: '.vortex',
    scrub: true,
    onUpdate() {
      webglScene.gravity = state.gravity;
    },
  },
});
```

This gives us a clean responsibility split:

```text
GSAP
= narrative timeline / scroll director

WebGL
= specialized visual renderer
```

---

## 10. Adaptive-quality strategy

If a WebGL enhancement is eventually added, quality should not be binary.

### Tier A — high capability

- full WebGL enhancement;
- high particle count;
- full effect set;
- higher rendering resolution;
- complex shader path.

### Tier B — normal capability

- WebGL enabled;
- fewer particles;
- lower internal resolution;
- simpler shaders;
- fewer texture layers.

### Tier C — constrained, unsupported, or reduced motion

- DOM/GSAP fallback;
- static or lightly animated photography;
- minimal particle count;
- no shader distortion;
- no intensive vortex rendering.

Internal canvas resolution can also be reduced independently of CSS display size. A canvas displayed at 1200 x 800 CSS pixels might render internally at 900 x 600 during a fast-moving effect and be upscaled by the browser.

---

## 11. Reduced motion takes priority over capability

A powerful GPU is not permission to ignore user motion preferences.

If `prefers-reduced-motion: reduce` is active, the implementation should select the low-motion path even when WebGL is fully supported.

Capability answers:

> Can the device render this?

Accessibility preference answers:

> Should we render this experience for this user?

The second question takes precedence.

---

## 12. Recommended implementation sequence

Do not introduce WebGL before photographic DOM integration is measured.

Recommended order:

1. Replace major CSS botanical actors with optimized photographic layers.
2. Keep existing DOM/GSAP motion architecture.
3. Benchmark desktop, tablet, and representative mobile devices.
4. Measure frame rate, long frames, memory, image decoding, and interaction responsiveness.
5. Reduce and resize photographic actors until the DOM version is consistently smooth.
6. Evaluate whether the visual ceiling is actually limiting the intended art direction.
7. Only then prototype WebGL for a single signature scene.
8. Keep the DOM scene as the permanent fallback.
9. Add adaptive quality levels.
10. Test context loss and fallback behavior.

If the photographic DOM version already looks extraordinary and performs well, there is no requirement to add WebGL at all.

---

## Architectural conclusion

Zero-G Bloom needs the browser's normal graphics and compositing capabilities, but **does not require WebGL or a powerful GPU as a product requirement**.

The commercial engineering principle is:

> Build the exceptional experience with the simplest rendering technology that achieves it reliably.

For this project that means:

```text
DOM + optimized photography + CSS transforms + GSAP first
```

and, only where it creates a genuinely new visual capability:

```text
optional WebGL enhancement
```

The desired outcome is:

```text
broad consumer audience
        -> excellent core experience

capable devices
        -> optional spectacular enhancement

unsupported / constrained devices
        -> fully functional fallback
```

That keeps the florist site commercially safe while preserving room for one genuinely extraordinary graphics moment.

## Reference topics

For implementation work, consult current browser documentation for:

- WebGL API and context availability;
- WebGL context-loss handling;
- browser graphics best practices;
- texture and VRAM budgeting;
- current WebGL compatibility tables.
