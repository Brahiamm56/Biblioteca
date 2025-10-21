import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para agregar el token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token inválido o expirado, redirigir al login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Servicios de Autenticación
export const authService = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => {
    localStorage.removeItem('token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

// Servicios de Socios
export const sociosService = {
  getAll: () => api.get('/socios'),
  getById: (id) => api.get(`/socios/${id}`),
  create: (data) => api.post('/socios', data),
  update: (id, data) => api.put(`/socios/${id}`, data),
  delete: (id) => api.delete(`/socios/${id}`)
};

// Servicios de Libros
export const librosService = {
  getAll: () => api.get('/libros'),
  getById: (id) => api.get(`/libros/${id}`),
  create: (data) => api.post('/libros', data),
  update: (id, data) => api.put(`/libros/${id}`, data),
  delete: (id) => api.delete(`/libros/${id}`)
};

// Servicios de Préstamos
export const prestamosService = {
  getAll: () => api.get('/prestamos'),
  getActivos: () => api.get('/prestamos/activos'),
  getById: (id) => api.get(`/prestamos/${id}`),
  create: (data) => api.post('/prestamos', data),
  devolver: (id, estaDañado) => api.put(`/prestamos/devolver/${id}`, { estaDañado }),
  delete: (id) => api.delete(`/prestamos/${id}`)
};

// Servicios de Multas
export const multasService = {
  getAll: () => api.get('/multas'),
  getById: (id) => api.get(`/multas/${id}`),
  create: (data) => api.post('/multas', data),
  delete: (id) => api.delete(`/multas/${id}`)
};

export default api;
