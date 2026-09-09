import { defineConfig } from 'vite';

export default defineConfig({
  // Relative asset URLs keep the same build portable locally and under
  // https://prithiraj.github.io/experiment/ without hard-coding a host.
  base: './',
});
