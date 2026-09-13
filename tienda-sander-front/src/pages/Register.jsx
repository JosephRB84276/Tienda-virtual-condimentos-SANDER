import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';

export default function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    tipoDocumento: 'CC',
    numeroDocumento: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { nombre, apellido, email, telefono, direccion, tipoDocumento, numeroDocumento, password, confirmPassword } = formData;

    // Validaciones
    if (!nombre || !apellido || !email || !telefono || !direccion || !numeroDocumento || !password || !confirmPassword) {
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Ingresa un correo electrónico válido');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.register({
        nombre,
        apellido,
        email,
        telefono,
        direccion,
        tipoDocumento,
        numeroDocumento,
        password
      });

      if (response.mensaje && (response.mensaje.includes('éxito') || response.mensaje.includes('Registro'))) {
        setSuccess('¡Registro exitoso! Redirigiendo al login en 3 segundos...');
        
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          direccion: '',
          tipoDocumento: 'CC',
          numeroDocumento: '',
          password: '',
          confirmPassword: ''
        });
        
        // Redirigir al login después de 3 segundos
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(response.mensaje || 'Error en el registro');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-login">
      <form className="Form-register" onSubmit={handleSubmit}>
        <h4>Crear Cuenta</h4>
        
        {/* Mensaje de error */}
        {error && (
          <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </p>
        )}
        
        {success && (
          <div style={{ 
            background: '#dcfce7', 
            border: '1px solid #4ade80', 
            color: '#15803d', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '15px',
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 'bold'
          }}>
            {success}
          </div>
        )}

        <input type="text" name="nombre" className="controls" placeholder="Nombre completo" value={formData.nombre} onChange={handleChange} disabled={loading} required />
        <input type="text" name="apellido" className="controls" placeholder="Apellido" value={formData.apellido} onChange={handleChange} disabled={loading} required />
        
        {/* Selector de Tipo de Documento */}
        <select name="tipoDocumento" className="controls" value={formData.tipoDocumento} onChange={handleChange} disabled={loading} required style={{ backgroundColor: '#252323', color: 'white' }}>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="PA">Pasaporte</option>
          <option value="NIT">NIT</option>
        </select>

        {/* Número de Documento */}
        <input type="text" name="numeroDocumento" className="controls" placeholder="Número de documento de identidad" value={formData.numeroDocumento} onChange={handleChange} disabled={loading} required />
        
        <input type="email" name="email" className="controls" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} disabled={loading} required />
        <input type="tel" name="telefono" className="controls" placeholder="Teléfono / Celular" value={formData.telefono} onChange={handleChange} disabled={loading} required />
        <input type="text" name="direccion" className="controls" placeholder="Dirección de envío" value={formData.direccion} onChange={handleChange} disabled={loading} required />
        
        <input type="password" name="password" className="controls" placeholder="Contraseña (mín. 6 caracteres)" value={formData.password} onChange={handleChange} disabled={loading} required />
        <input type="password" name="confirmPassword" className="controls" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} disabled={loading} required />

        <button type="submit" className="buttons" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="buttons"
          style={{ backgroundColor: 'var(--color-secondary)', marginTop: '10px' }}
        >
          Volver al Inicio
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', color: 'white' }}>
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}