import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { pedidosAPI } from '../api';
import { useState } from 'react';

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    // Calcula el total general del carrito
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        // ✅ CORREGIDO: Cambiado 'user' por 'userName' para coincidir con Login.jsx
        const usuario = localStorage.getItem('userName');
        
        if (!usuario) {
            setError('Debes iniciar sesión para finalizar la compra');
            navigate('/login');
            return;
        }

        if (cart.length === 0) {
            setError('El carrito está vacío');
            return;
        }

        setProcessing(true);
        setError('');

        try {
            // Preparar datos para la API
            const pedidoData = {
                usuario,
                items: cart.map(item => ({
                    nombre: item.name,
                    empaque: item.packType,
                    cantidad: item.quantity,
                    precio: item.price,
                    subtotal: item.price * item.quantity
                })),
                total
            };

            // Enviar a la API real
            const response = await pedidosAPI.create(pedidoData);

            if (response.mensaje && response.mensaje.includes('exitosamente')) {
                alert('Compra finalizada exitosamente\n\nGracias por tu compra.');
                clearCart();
                navigate('/invoice', { state: { pedido: response.pedido } });
            } else {
                setError(response.mensaje || 'Error al procesar el pedido');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        } finally {
            setProcessing(false);
        }
    };

    // Si el carrito está vacío, muestra mensaje alternativo
    if (cart.length === 0) {
        return (
            <section className="carrito-container">
                <div className="carrito-vacio" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                    <h2 className="section-title">Tu carrito está vacío 🛒</h2>
                    <p style={{ fontSize: '1.1rem', margin: '1rem 0 2rem' }}>
                        Parece que aún no has agregado productos.
                    </p>
                    <Link to="/store" className="btn btn-primary">Volver a la tienda</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="carrito-container">
            <h2 className="section-title">Carrito de Compras</h2>

            {error && (
                <p style={{ color: '#ff4444', textAlign: 'center', padding: '1rem', background: '#fee2e2', borderRadius: '8px', margin: '0 1rem 1rem' }}>
                    {error}
                </p>
            )}

            <div className="carrito-grid">
                {/* COLUMNA IZQUIERDA: Lista de productos */}
                <div className="carrito-productos">
                    <h3>Productos ({cart.length})</h3>

                    {cart.map((item) => (
                        <article key={`${item.id}-${item.packType}`} className="producto-card" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '1rem', 
                            marginBottom: '1rem', 
                            padding: '1rem',
                            textAlign: 'left'
                        }}>
                            {/* Imagen pequeña */}
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                style={{ 
                                    width: '80px', 
                                    height: '80px', 
                                    objectFit: 'cover', 
                                    borderRadius: '8px' 
                                }} 
                            />

                            {/* Información del producto */}
                            <div style={{ flex: 1 }}>
                                <h4 style={{ margin: '0 0 0.3rem', fontSize: '1rem' }}>{item.name}</h4>
                                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: '#666' }}>
                                    Empaque: {item.packType}
                                </p>
                                <p style={{ margin: '0', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                    ${item.price.toLocaleString('es-CO')}
                                </p>
                            </div>

                            {/* Controles de cantidad */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <button 
                                    className="btn btn-secondary"
                                    style={{ padding: '0.3rem 0.8rem', fontSize: '1.2rem' }}
                                    onClick={() => updateQuantity(item.id, item.packType, item.quantity - 1)}
                                    aria-label="Disminuir cantidad"
                                >
                                    −
                                </button>
                                
                                <span style={{ minWidth: '2rem', textAlign: 'center', fontWeight: 'bold' }}>
                                    {item.quantity}
                                </span>
                                
                                <button 
                                    className="btn btn-secondary"
                                    style={{ padding: '0.3rem 0.8rem', fontSize: '1.2rem' }}
                                    onClick={() => updateQuantity(item.id, item.packType, item.quantity + 1)}
                                    aria-label="Aumentar cantidad"
                                >
                                    +
                                </button>
                            </div>

                            {/* Subtotal del item */}
                            <div style={{ minWidth: '80px', textAlign: 'right', fontWeight: 'bold' }}>
                                ${(item.price * item.quantity).toLocaleString('es-CO')}
                            </div>

                            {/* Botón eliminar */}
                            <button 
                                className="btn btn-danger"
                                style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem' }}
                                onClick={() => removeFromCart(item.id, item.packType)}
                                aria-label={`Eliminar ${item.name}`}
                            >
                                🗑️
                            </button>
                        </article>
                    ))}

                    {/* Botón vaciar carrito */}
                    <button 
                        className="btn btn-danger" 
                        onClick={clearCart}
                        style={{ marginTop: '1rem', width: '100%' }}
                    >
                        Vaciar carrito
                    </button>
                </div>

                {/* COLUMNA DERECHA: Resumen de compra */}
                <aside className="resumen-compra">
                    <h3>Resumen de Compra</h3>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        padding: '0.8rem 0', 
                        borderBottom: '1px solid #ccc' 
                    }}>
                        <span>Subtotal:</span>
                        <span>${total.toLocaleString('es-CO')}</span>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        padding: '0.8rem 0', 
                        borderBottom: '1px solid #ccc' 
                    }}>
                        <span>Envío:</span>
                        <span style={{ color: 'var(--color-primary)' }}>GRATIS</span>
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        padding: '1.2rem 0', 
                        fontSize: '1.3rem', 
                        fontWeight: 'bold',
                        color: 'var(--color-secondary)'
                    }}>
                        <span>TOTAL:</span>
                        <span>${total.toLocaleString('es-CO')}</span>
                    </div>

                    {/* Botón finalizar compra (AHORA CON API) */}
                    <button 
                        className="btn btn-success" 
                        style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}
                        onClick={handleCheckout}
                        disabled={processing}
                    >
                        {processing ? 'Procesando...' : 'Finalizar Compra'}
                    </button>

                    {/* Enlace para seguir comprando */}
                    <div style={{ marginTop: '1rem' }}>
                        <Link to="/store" className="btn btn-secondary" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
                            Seguir comprando
                        </Link>
                    </div>
                </aside>
            </div>
        </section>
    );
}