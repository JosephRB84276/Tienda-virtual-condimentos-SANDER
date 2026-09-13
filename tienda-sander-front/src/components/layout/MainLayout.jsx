import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

/**
Componente: MainLayout
Responsabilidad: Plantilla base que mantiene Navbar y Footer visibles.
*/
export default function MainLayout() {
    return (
    <div className="app-layout">
        <Navbar />
        <main className="main-content">
        <Outlet /> {/* Renderiza la página actual según la ruta */}
        </main>
        <Footer />
    </div>
    );
}