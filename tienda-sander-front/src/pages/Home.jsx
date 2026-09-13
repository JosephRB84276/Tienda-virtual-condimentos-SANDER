import { Link } from 'react-router-dom';

/**
Página: Home (Inicio)
Responsabilidad: Mostrar hero principal, catálogo de productos y resumen "¿Quiénes somos?".
Usa datos estáticos para demostración visual. En la fase de integración se consumirán desde la API Django.
@returns {JSX.Element} Estructura completa de la página de inicio
 */
export default function Home() {
  // Datos estáticos de productos (simulan respuesta de backend)
    const productos = [
    { id: 1, name: 'Pasta de aji', img: '/imagenes/imagen2.PNG' },
    { id: 2, name: 'Pasta de ajo', img: '/imagenes/imagen4.PNG' },
    { id: 3, name: 'Adobo', img: '/imagenes/imagen6.PNG' },
    { id: 4, name: 'Miel', img: '/imagenes/imagen5.PNG' },
    { id: 5, name: 'Sumo de limón', img: '/imagenes/imagen3.PNG' }
    ];

    const destacados = [
    { id: 'd1', name: 'Pasta de AJI', desc: 'Pasta ideal para darle un poco de picor a tus comidas', img: '/imagenes/imagen2.PNG' },
    { id: 'd2', name: 'Pasta de Ajo', desc: 'Perfecta para sazonar tus comidas con un sabor unico', img: '/imagenes/imagen4.PNG' },
    { id: 'd3', name: 'Adobo', desc: 'El adobo que le da el toque especial a tus platillos', img: '/imagenes/imagen6.PNG' }
    ];

    return (
    <>
      {/* HERO PRINCIPAL */}
        <header id="home" className="hero">
        <div className="hero-content">
            <h1>Condimentos Sander</h1>
            <p>"El sazón lo ponemos nosotros"</p>
            <Link to="/store" className="btn btn-primary">Ver Tienda</Link>
        </div>
        </header>

      {/* SECCIÓN PRODUCTOS */}
        <section id="productos" className="productos">
        <h2 className="section-title">Nuestros productos</h2>
        <div className="productos-grid">
            {productos.map((prod) => (
            <article key={prod.id} className="producto-card">
                <img src={prod.img} alt={prod.name} />
                <h3>{prod.name}</h3>
            </article>
            ))}
        </div>
        </section>

      {/* SECCIÓN DESTACADOS */}
        <section className="destacados">
        <h2 className="section-title">Productos Destacados</h2>
        <div className="destacados-grid">
            {destacados.map((prod) => (
            <article key={prod.id} className="destacado-card">
                <img src={prod.img} alt={prod.name} />
                <h3>{prod.name}</h3>
                <p>{prod.desc}</p>
                <Link to="/store" className="btn btn-secondary">Añadir al carrito</Link>
            </article>
            ))}
        </div>
        </section>

      {/* SECCIÓN QUIÉNES SOMOS */}
        <section id="quienes" className="quienes-somos">
        <div className="qs-container">
            <div className="qs-imagen">
            <img src="/imagenes/imagen1.PNG" alt="Productos artesanales" />
            </div>
            <div className="qs-texto">
            <h2>¿Quiénes somos?</h2>
            <p>
                En Condimentos Sander, llevamos más de 15 años deleitando paladares con productos 100% naturales,
                elaborados con ingredientes seleccionados y recetas transmitidas de generación en generación.
                Nuestra pasión por los sabores auténticos y nuestro compromiso con la calidad nos han convertido en
                referentes en la producción de condimentos artesanales en Colombia.
            </p>
            <Link to="/about" className="btn btn-primary">Conocer mas</Link>
            </div>
        </div>
        </section>
    </>
    );
}