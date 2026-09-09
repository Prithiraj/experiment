import './styles/main.css';
import './styles/motion.css';
import './styles/zero-g.css';
import './styles/orbit.css';
import './styles/horizontal.css';
import './styles/vortex.css';
import './styles/return.css';
import './styles/performance.css';
import './styles/fallback.css';
import './styles/polish.css';
import { initMotionSystem } from './motion/orchestrator';
import { initCart } from './ui/cart';
import { initGravityTelemetry } from './ui/telemetry';

const cleanupMotionSystem = initMotionSystem();
const cleanupCart = initCart();
const cleanupTelemetry = initGravityTelemetry();
const year = document.querySelector<HTMLElement>('[data-year]');

year && (year.textContent = String(new Date().getFullYear()));

const onPageHide = (event: PageTransitionEvent) => {
  if (event.persisted) return;
  cleanupTelemetry();
  cleanupCart();
  cleanupMotionSystem();
};

const onPageShow = (event: PageTransitionEvent) => {
  if (!event.persisted) return;
  window.requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
};

window.addEventListener('pagehide', onPageHide);
window.addEventListener('pageshow', onPageShow);
