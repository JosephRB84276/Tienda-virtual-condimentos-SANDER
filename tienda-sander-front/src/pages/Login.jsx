import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../api';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!usuario.trim() || !password.trim()) {
      setError('Por favor complete todos los campos');
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login(usuario, password);

      if (response.mensaje && response.mensaje.includes('satisfactoria')) {
        localStorage.setItem('userName', response.usuario);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/store');
      } else {
        setError(response.mensaje || 'Error en la autenticación');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-login">
      <form className="Form-login" onSubmit={handleSubmit}>
        <h5>Iniciar Sesión</h5>
        
        {error && (
          <p style={{ color: '#ff6b6b', textAlign: 'center', marginBottom: '10px', fontSize: '14px' }}>
            {error}
          </p>
        )}

        <input
          type="text"
          className="controls"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          disabled={loading}
        />
        
        <input
            type="password"
            className="controls"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
        />

        <button type="submit" className="buttons" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>

        <p style={{ textAlign: 'center', marginTop: '15px', color: 'white' }}>
            ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
        </p>

        <button
            type="button"
            onClick={() => navigate('/')}
            className="buttons"
            style={{ backgroundColor: 'var(--color-secondary)', marginTop: '10px' }}
        >
            Volver al Inicio
        </button>
        </form>
    </div>
    );
}