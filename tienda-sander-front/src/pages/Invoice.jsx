import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Invoice() {
  const location = useLocation();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    // Recibimos el pedido que el carrito envió al backend
    if (location.state?.pedido) {
      setPedido(location.state.pedido);
    } else {
      // Si no hay datos, redirigir a la tienda
      navigate('/store');
    }
  }, [location, navigate]);

  if (!pedido) {
    return <div className="container" style={{ textAlign: 'center', padding: '3rem' }}>Cargando factura...</div>;
  }

  // Desestructuración segura
  const { id, usuario, fecha, items, total, estado } = pedido;

  return (
    <div className="carrito-container">
      <div className="resumen-compra" style={{ maxWidth: '850px', margin: '0 auto', padding: '2.5rem' }}>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>Factura de Compra</h2>
        
        {/* Encabezado */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexWrap: 'wrap', 
          gap: '1rem',
          marginBottom: '2rem', 
          borderBottom: '2px solid var(--color-primary)',
          paddingBottom: '1rem'
        }}>
          <div>
            <p style={{ margin: '0.3rem 0' }}><strong>N° Pedido:</strong> {id}</p>
            <p style={{ margin: '0.3rem 0' }}><strong>Fecha:</strong> {new Date(fecha).toLocaleDateString('es-CO')} {new Date(fecha).toLocaleTimeString('es-CO', {hour: '2-digit', minute:'2-digit'})}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: '0.3rem 0' }}><strong>Cliente:</strong> {usuario}</p>
            <p style={{ margin: '0.3rem 0' }}><strong>Estado:</strong> <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{estado}</span></p>
          </div>
        </div>

        {/* Tabla de Productos */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
          <thead>
            <tr style={{ background: 'var(--color-secondary)', color: 'white' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Producto</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Empaque</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Cant.</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Precio Unit.</th>
              <th style={{ padding: '12px', textAlign: 'right' }}>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, idx) => {
                const precio = item.price || item.precio || 0;
                const cantidad = item.quantity || item.cantidad || 1;
                return (
                  <tr key={idx} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '12px' }}>{item.name || item.nombre}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{item.packType || item.empaque || 'Único'}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{cantidad}</td>
                    <td style={{ padding: '12px', textAlign: 'right' }}>${precio.toLocaleString('es-CO')}</td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold' }}>
                      ${(precio * cantidad).toLocaleString('es-CO')}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr><td colSpan="5" style={{ padding: '1rem', textAlign: 'center', color: '#666' }}>No hay productos en este pedido</td></tr>
            )}
          </tbody>
        </table>

        {/* Total General */}
        <div style={{ 
          textAlign: 'right', 
          fontSize: '1.6rem', 
          fontWeight: 'bold', 
          marginBottom: '2.5rem', 
          color: 'var(--color-secondary)',
          padding: '1rem',
          background: 'var(--color-light)',
          borderRadius: '8px'
        }}>
          TOTAL: ${total?.toLocaleString('es-CO') || '0'}
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => navigate('/store')}>
            Volver a la Tienda
          </button>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            🖨️ Imprimir Factura
          </button>
        </div>
      </div>
    </div>
  );
}