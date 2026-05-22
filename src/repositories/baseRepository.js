/**
 * Repositorio HTTP base para toda la SPA.
 * - Centraliza métodos GET/POST/PUT/DELETE.
 * - Mantiene api_url configurable para despliegue por IP.
 * - Se integra con authFetch si existe globalmente.
 */

/**
 * Mantén esta variable para despliegue en red (IP local/servidor).
 * Puedes sobreescribirla con:
 * - VITE_API_URL (si aplica en build)
 * - window.__API_URL__ (si la inyectas por script)
 */
export const api_url =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL) ||
  window.__API_URL__ ||
  'http://localhost:3000';

/**
 * Devuelve cliente fetch autenticado si existe; si no, usa fetch nativo.
 */
const getHttpClient = () => {
  if (typeof window !== 'undefined' && typeof window.authFetch === 'function') {
    return window.authFetch.bind(window);
  }
  return fetch.bind(window);
};

/**
 * Serializa query params en URL.
 */
const withQuery = (endpoint, query = null) => {
  if (!query || typeof query !== 'object') return `${api_url}${endpoint}`;

  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString
    ? `${api_url}${endpoint}${endpoint.includes('?') ? '&' : '?'}${queryString}`
    : `${api_url}${endpoint}`;
};

/**
 * Procesa respuesta y normaliza errores.
 */
const parseResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const payload = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(
      payload?.message || `Error HTTP ${response.status}: ${response.statusText}`
    );
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
};

/**
 * Método base de request.
 */
const request = async (method, endpoint, { data, query, headers } = {}) => {
  const httpClient = getHttpClient();
  const url = withQuery(endpoint, query);

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    }
  };

  if (data !== undefined) {
    config.body = JSON.stringify(data);
  }

  const response = await httpClient(url, config);
  return parseResponse(response);
};

export const baseRepository = {
  get: (endpoint, options = {}) => request('GET', endpoint, options),
  post: (endpoint, data, options = {}) => request('POST', endpoint, { ...options, data }),
  put: (endpoint, data, options = {}) => request('PUT', endpoint, { ...options, data }),
  delete: (endpoint, options = {}) => request('DELETE', endpoint, options)
};

// Alias de compatibilidad con nombres previos del proyecto:
export const obtenerDatos = (endpoint, options = {}) => baseRepository.get(endpoint, options);
export const enviarDatos = (endpoint, data, options = {}) => baseRepository.post(endpoint, data, options);
export const actualizarDatos = (endpoint, data, options = {}) => baseRepository.put(endpoint, data, options);
export const eliminarDatos = (endpoint, options = {}) => baseRepository.delete(endpoint, options);
