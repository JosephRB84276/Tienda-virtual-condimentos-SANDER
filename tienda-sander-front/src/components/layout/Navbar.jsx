import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';

export default function Navbar() {
    const [userName, setUserName] = useState(null);
    const { cart, clearCart } = useCart(); 
    const navigate = useNavigate();

    // Verificar si hay sesión activa al cargar
    useEffect(() => {
        const user = localStorage.getItem('userName');
        if (user) {
            setUserName(user);
        }
    }, []);

    //Función para cerrar sesión
    const handleLogout = () => {
        // 1. Vaciar el carrito del navegador
        clearCart(); 
        
        // 2. Borrar datos de sesión
        localStorage.removeItem('userName');
        localStorage.removeItem('isLoggedIn');
        
        // 3. Limpiar estado visual
        setUserName(null);
        
        // 4. Redirigir al login
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="nav-logo">
                    <Link to="/">Condimentos Sander</Link>
                </div>
                <ul className="nav-menu">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/about">¿Quiénes somos?</Link></li>
                    <li><Link to="/store">Tienda</Link></li>
                    
                    {/* Carrito con contador */}
                    <li>
                        <Link to="/cart" style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                Mi carrito 
                            <span style={{ 
                                background: '#d35400', 
                                color: 'white', 
                                borderRadius: '50%', 
                                padding: '2px 6px', 
                                fontSize: '0.8rem' 
                            }}>
                                {cart.length}
                            </span>
                        </Link>
                    </li>

                    {/* Lógica de Sesión */}
                    {userName ? (
                        <>
                            <li style={{ color: '#ecf0f1', fontWeight: 'bold' }}>
                                👤 Hola, {userName}
                            </li>
                            <li>
                                <button 
                                    onClick={handleLogout}
                                    style={{
                                        background: 'transparent',
                                        border: '1px solid #e74c3c',
                                        color: '#e74c3c',
                                        padding: '5px 12px',
                                        borderRadius: '50px',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    Cerrar sesión
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Iniciar sesión</Link></li>
                            <li><Link to="/register">Registrarse</Link></li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}