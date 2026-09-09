import './styles/main.css';
import './styles/motion.css';
import './styles/zero-g.css';
import './styles/orbit.css';
import './styles/horizontal.css';
import { initMotionSystem } from './motion/orchestrator';

const cleanupMotionSystem = initMotionSystem();
let cartCount = 0;
let toastTimer: number | undefined;

const countNode = document.querySelector<HTMLElement>('[data-cart-count]');
const bagButton = document.querySelector<HTMLButtonElement>('[data-cart-button]');
const toast = document.querySelector<HTMLElement>('[data-cart-toast]');
const year = document.querySelector<HTMLElement>('[data-year]');

year && (year.textContent = String(new Date().getFullYear()));

document.querySelectorAll<HTMLButtonElement>('[data-add-to-cart]').forEach((button) => {
  button.addEventListener('click', () => {
    cartCount += 1;
    if (countNode) countNode.textContent = String(cartCount);
    bagButton?.setAttribute('aria-label', `Shopping bag, ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`);

    if (toast) {
      toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 1800);
    }
  });
});

window.addEventListener('pagehide', cleanupMotionSystem, { once: true });
