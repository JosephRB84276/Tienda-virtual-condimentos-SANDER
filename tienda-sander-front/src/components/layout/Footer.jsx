/**
Componente: Footer
Responsabilidad: Pie de página con información de contacto.
*/
export default function Footer() {
    return (
    <footer className="footer">
        <div className="footer-container">
        <div className="footer-section">
            <h3>Contáctanos</h3>
            <p>Teléfono: +57 123 456 7890</p>
            <p>Email: info@condimentossander.com</p>
        </div>
        <div className="footer-section">
            <h3>Horarios de atención</h3>
            <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
            <p>Sábados: 9:00 AM - 2:00 PM</p>
            <p>Domingo: Cerrado</p>
        </div>
        <div className="footer-section">
            <h3>Ubicación</h3>
            <p>Calle Principal #123</p>
            <p>Bogotá D.C, Cundinamarca</p>
            <p>Colombia</p>
        </div>
        </div>
        <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Condimentos Sander. Todos los derechos reservados.</p>
        </div>
    </footer>
    );
}