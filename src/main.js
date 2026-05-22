import { initRouter } from './router/router.js';
import { isAuthenticated } from './services/authService.js';

/**
 * Asegura que exista un contenedor principal para la SPA.
 * Si no existe, lo crea dentro de <main> o al final de <body>.
 */
const ensureAppContainer = () => {
  let app = document.getElementById('app');
  if (app) return app;

  app = document.createElement('div');
  app.id = 'app';

  const main = document.querySelector('main');
  if (main) {
    main.appendChild(app);
  } else {
    document.body.appendChild(app);
  }

  return app;
};

/**
 * Define hash inicial consistente con el estado de sesión.
 */
const applyInitialGuard = () => {
  if (window.location.hash) return;

  window.location.hash = isAuthenticated() ? '#/home' : '#/login';
};

/**
 * Bootstrap de aplicación.
 */
const bootstrap = () => {
  ensureAppContainer();
  applyInitialGuard();
  initRouter();
};

window.addEventListener('DOMContentLoaded', bootstrap);
