import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Store from './pages/Store';
import Cart from './pages/Cart';
import Invoice from './pages/Invoice';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import { CartProvider } from './hooks/useCart';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            
            {/*RUTAS PROTEGIDAS (Requieren login) */}
            <Route element={<ProtectedRoute />}>
              <Route path="store" element={<Store />} />   
              <Route path="cart" element={<Cart />} />
              <Route path="invoice" element={<Invoice />} />
            </Route>
          </Route>

          {/* Rutas públicas (sin layout completo) */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;