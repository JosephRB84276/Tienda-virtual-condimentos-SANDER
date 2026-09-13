/**
Página: About (¿Quiénes somos?)
 */
export default function About() {
    return (
    <>
      {/* HERO */}
        <header id="quienes" className="hero">
        <div className="hero-content">
            <h1>¿Quiénes somos?</h1>
        </div>
        </header>

      {/* MISIÓN Y VISIÓN */}
        <section className="quienes-somos">
        <div className="mision" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem 1rem' }}>
            <div className="qs-imagen-mision" style={{ flex: 1 }}>
            <img src="/imagenes/qs-imagen.PNG" alt="Misión" style={{ width: '100%', borderRadius: '10px' }} />
            </div>
            <div className="qs-texto" style={{ flex: 1, padding: '0 1rem' }}>
            <h2>Misión</h2>
            <p>
                Elaborar y comercializar condimentos y productos alimenticios de alta calidad, ofreciendo sabor, 
                frescura y confianza a nuestros clientes, mediante procesos responsables, cumplimiento de las normas 
                sanitarias y un compromiso constante con la mejora continua, contribuyendo al bienestar de las 
                familias colombianas y al desarrollo del sector alimentario.
            </p>
            </div>
        </div>

        <div className="vision" style={{ maxWidth: '1200px', margin: '2rem auto', display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem 1rem', borderTop: '1px solid #ccc' }}>
            <div className="qs-texto" style={{ flex: 1, padding: '0 1rem' }}>
            <h2>Visión</h2>
            <p>
                Para el año 2030, Condimentos Sander será reconocida a nivel regional y nacional como una empresa líder 
                en la producción de condimentos y productos alimenticios, destacándose por su calidad, innovación, 
                cumplimiento normativo y cercanía con sus clientes, consolidándose como una marca confiable en los 
                hogares y negocios del país.
            </p>
            </div>
            <div className="qs-imagen-vision" style={{ flex: 1 }}>
            <img src="/imagenes/qs-imagen2.PNG" alt="Visión" style={{ width: '100%', borderRadius: '10px' }} />
            </div>
        </div>
        </section>

      {/* HISTORIA */}
        <section id="historia" className="historia" style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 1rem' }}>
        <div className="historia-container" style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexDirection: 'column' }}>
            <div className="historia-contenido" style={{ textAlign: 'center', maxWidth: '800px' }}>
            <h2>Nuestra Historia</h2>
            <p style={{ textAlign: 'justify' }}>
                Condimentos Sander nació en el año 1990 en la ciudad de Bogotá, Colombia, fundada por la familia Sander 
                con el objetivo de ofrecer condimentos artesanales de alta calidad que realzaran los sabores de la 
                cocina colombiana. Lo que comenzó como un pequeño negocio familiar ha crecido hasta convertirse en una 
                empresa reconocida a nivel nacional, manteniendo siempre su compromiso con la calidad, la tradición y 
                la satisfacción del cliente.
            </p>
            </div>
            <div className="historia-imagen">
            <img src="/imagenes/qs-imagen3.PNG" alt="Historia" style={{ width: '100%', maxWidth: '500px', borderRadius: '10px' }} />
            </div>
        </div>
        </section>
    </>
    );
}