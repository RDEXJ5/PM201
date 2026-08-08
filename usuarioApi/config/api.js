let apiBaseUrl = '';

export function construirApiUrl(ip) {
  return `http://${ip.trim()}:5000`;
}

export function guardarApiUrl(url) {
  apiBaseUrl = url;
}

export function obtenerApiUrl() {
  return apiBaseUrl;
}
