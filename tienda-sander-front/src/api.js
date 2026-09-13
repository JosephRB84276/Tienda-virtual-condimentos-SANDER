// Configuración base
const API_URL = 'http://localhost:3000/api';

//AUTENTICACIÓN
export const authAPI = {
  login: async (usuario, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password })
      });
      return await response.json();
    } catch (error) {
      console.error('Error login:', error);
      return { mensaje: 'Error de conexión con el servidor' };
    }
  },

  register: async (userData) => {
    try {
      console.log('🚀 Enviando registro:', userData);
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      console.log('📥 Respuesta:', data);
      
      if (!response.ok) {
        throw new Error(data.mensaje || 'Error en el registro');
      }
      return data;
      
    } catch (error) {
      console.error('❌ Error register:', error.message);
      return { success: false, mensaje: error.message };
    }
  }
};

//PRODUCTOS
export const productosAPI = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_URL}/productos`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error getAll productos:', error);
      return { data: [] };
    }
  },

  getById: async (id) => {
    try {
      const response = await fetch(`${API_URL}/productos/${id}`);
      return await response.json();
    } catch (error) {
      console.error(' Error getById:', error);
      return { mensaje: 'Error al cargar producto' };
    }
  }
};

//PEDIDOS
export const pedidosAPI = {
  create: async (pedidoData) => {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedidoData)
    });
    return await response.json();
  },
  getByUser: async (usuario) => {
    const response = await fetch(`${API_URL}/pedidos/${usuario}`);
    return await response.json();
  }
};