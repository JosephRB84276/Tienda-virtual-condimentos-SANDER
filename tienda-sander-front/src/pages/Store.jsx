import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { productosAPI } from '../api';

export default function Store() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOption, setSelectedOption] = useState({});
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        setLoading(true);
        try {
            const res = await productosAPI.getAll();
            if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                setProductos(res.data);
                
                // Inicializar primera opción por defecto
                const initialOption = {};
                res.data.forEach(prod => {
                    if (prod.options && prod.options.length > 0) {
                        initialOption[prod.id] = prod.options[0];
                    }
                });
                setSelectedOption(initialOption);
            } else {
                setError('No se encontraron productos disponibles');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
            console.error('❌ Error cargando productos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (producto) => {
        //VALIDAR LOGIN ANTES DE AGREGAR
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            if (window.confirm('⚠️ Debes iniciar sesión para agregar productos al carrito.\n¿Deseas ir al login?')) {
                navigate('/login');
            }
            return;
        }

        const opt = selectedOption[producto.id];
        if (!opt) {
            alert('Por favor selecciona una presentación');
            return;
        }

        addToCart({
            id: producto.id,
            name: producto.name,
            image: producto.image,
            packType: opt.label,  // "Copa", "Libra", etc.
            price: opt.value,     // Precio según presentación
            quantity: 1
        });

        // Feedback visual (opcional)
        // alert(`${producto.name} (${opt.label}) agregado al carrito`);
    };

    if (loading) return <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>Cargando catálogo...</div>;
    if (error) return <div className="container" style={{ textAlign: 'center', padding: '3rem', color: 'red' }}>{error}</div>;

    return (
        <div>
            <h2 className="section-title">Nuestra Tienda</h2>
            <div className="container">
                {productos.map((prod) => {
                    const optActual = selectedOption[prod.id];
                    
                    return (
                        <div className="producto-card" key={prod.id}>
                            {/* Imagen con fallback */}
                            <div style={{ width: '100%', height: '200px', backgroundColor: '#f9f9f9', borderRadius: '8px', overflow: 'hidden', marginBottom: '1rem' }}>
                                <img 
                                    src={prod.image} 
                                    alt={prod.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.parentElement.innerHTML = '<span style="display:flex;align-items:center;justify-content:center;height:100%;color:#888;">Sin imagen</span>';
                                    }}
                                />
                            </div>
                            
                            <h3>{prod.name}</h3>
                            
                            {/*SELECTOR DE PRESENTACIONES (Z-Index alto para que no se corte) */}
                            {prod.options && prod.options.length > 0 && optActual && (
                                <div style={{ margin: '1rem 0', position: 'relative', zIndex: 10 }}>
                                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--color-secondary)', fontSize: '0.9rem' }}>
                                        Presentación:
                                    </label>
                                    <select
                                        value={optActual.label}
                                        onChange={(e) => {
                                            const sel = prod.options.find(o => o.label === e.target.value);
                                            if (sel) setSelectedOption(prev => ({ ...prev, [prod.id]: sel }));
                                        }}
                                        style={{
                                            width: '100%',
                                            padding: '10px 8px',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                            fontSize: '0.9rem',
                                            backgroundColor: '#fff',
                                            cursor: 'pointer',
                                            zIndex: 20,
                                            position: 'relative'
                                        }}
                                    >
                                        {prod.options.map((opt, idx) => (
                                            <option key={idx} value={opt.label}>
                                                {opt.label} - ${opt.value.toLocaleString('es-CO')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Precio dinámico */}
                            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', margin: '0.5rem 0', color: 'var(--color-primary)' }}>
                                ${optActual?.value?.toLocaleString('es-CO') || '0'}
                            </p>

                            <button 
                                className="btn btn-primary" 
                                onClick={() => handleAddToCart(prod)}
                                style={{ width: '100%', marginTop: '0.5rem', border: 'none', cursor: 'pointer' }}
                            >
                                Agregar al Carrito
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}