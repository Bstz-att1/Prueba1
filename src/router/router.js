import { routes, notFoundRoute } from './routes.js';
import { isAuthenticated } from '../services/authService.js';

let activeCleanup = null;

/**
 * Obtiene la ruta hash actual.
 */
const getCurrentPath = () => window.location.hash || '#/';

/**
 * Evalúa coincidencia de ruta soportando parámetros dinámicos.
 * Ejemplo: #/users/:id con #/users/12
 */
const matchRoute = (routePath, currentPath) => {
  const routeSegments = routePath.split('/');
  const currentSegments = currentPath.split('/');

  if (routeSegments.length !== currentSegments.length) return null;

  const params = {};

  for (let i = 0; i < routeSegments.length; i += 1) {
    const routeSegment = routeSegments[i];
    const currentSegment = currentSegments[i];

    if (routeSegment.startsWith(':')) {
      params[routeSegment.slice(1)] = decodeURIComponent(currentSegment);
      continue;
    }

    if (routeSegment !== currentSegment) {
      return null;
    }
  }

  return params;
};

/**
 * Busca la definición de ruta y sus params.
 */
const resolveRoute = (path) => {
  for (const route of routes) {
    const params = matchRoute(route.path, path);
    if (params) {
      return { route, params };
    }
  }
  return { route: notFoundRoute, params: {} };
};

/**
 * Guard de autenticación.
 * Compatible con distintos nombres de token para no romper integración actual.
 */
const hasActiveSession = () => isAuthenticated();

/**
 * Ejecuta cleanup del módulo previo para evitar memory leaks.
 */
const cleanupActiveModule = () => {
  if (typeof activeCleanup === 'function') {
    try {
      activeCleanup();
    } catch (error) {
      console.error('[router] Error durante cleanup de módulo:', error);
    } finally {
      activeCleanup = null;
    }
  }
};

/**
 * Render principal de la SPA.
 */
export const renderRoute = async () => {
  const appContainer = document.getElementById('app');

  if (!appContainer) {
    console.error('[router] No se encontró el contenedor #app.');
    return;
  }

  const currentPath = getCurrentPath();
  const { route, params } = resolveRoute(currentPath);

  // Ejecutar limpieza de vista anterior antes de montar la nueva.
  cleanupActiveModule();

  // Guard de seguridad para rutas protegidas.
  if (route.isProtected && !hasActiveSession()) {
    window.location.hash = '#/login';
    return;
  }

  // Evita entrar a rutas públicas de auth si ya hay sesión.
  if (route.onlyGuest && hasActiveSession()) {
    window.location.hash = '#/home';
    return;
  }

  document.title = route.title || 'SPA';

  const renderedView = await Promise.resolve(route.view({ params }));
  if (renderedView instanceof Node) {
    appContainer.innerHTML = '';
    appContainer.appendChild(renderedView);
  } else {
    appContainer.innerHTML = renderedView;
  }

  if (typeof route.controller === 'function') {
    // El controlador puede retornar una función destroy/cleanup.
    activeCleanup = (await Promise.resolve(route.controller({ params }))) || null;
  }
};

/**
 * Navegación programática interna.
 */
export const navigateTo = (path) => {
  if (!path.startsWith('#')) {
    window.location.hash = `#${path}`;
    return;
  }
  window.location.hash = path;
};

/**
 * Inicializa listeners globales del router.
 */
export const initRouter = () => {
  window.addEventListener('hashchange', renderRoute);
  renderRoute();
};

/**
 * Permite desmontar completamente el router (tests / hot reload).
 */
export const destroyRouter = () => {
  window.removeEventListener('hashchange', renderRoute);
  cleanupActiveModule();
};
