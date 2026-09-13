import { createContext, useContext, useState, useEffect } from 'react';

/**
Contexto del carrito: Comparte el estado del carrito entre Navbar, Store y Cart.
Sincroniza automáticamente con localStorage para persistencia al recargar.
*/
const CartContext = createContext();

export function CartProvider({ children }) {
  // Inicializa estado desde localStorage o array vacío
    const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('carrito-sander');
    return saved ? JSON.parse(saved) : [];
    });

  // Guarda en localStorage cada vez que el carrito cambia
    useEffect(() => {
    localStorage.setItem('carrito-sander', JSON.stringify(cart));
    }, [cart]);

  /* Agrega producto o suma cantidad si ya existe (mismo ID + mismo empaque) */
    const addToCart = (product) => {
    setCart((prev) => {
        const exists = prev.find(
        (item) => item.id === product.id && item.packType === product.packType
        );
        if (exists) {
        return prev.map((item) =>
            item.id === product.id && item.packType === item.packType
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
        }
        return [...prev, product];
    });
    };

  /* Elimina un producto específico del carrito */
    const removeFromCart = (id, packType) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.packType === packType)));
    };

  /* Actualiza cantidad de un producto */
    const updateQuantity = (id, packType, newQty) => {
    if (newQty <= 0) {
        removeFromCart(id, packType);
        return;
    }
    setCart((prev) =>
        prev.map((item) =>
        item.id === id && item.packType === packType ? { ...item, quantity: newQty } : item
        )
    );
    };

  /* Vacía todo el carrito */
    const clearCart = () => setCart([]);

    return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
        {children}
    </CartContext.Provider>
    );
}

/* Hook personalizado para consumir el carrito fácilmente */
export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart debe usarse dentro de <CartProvider>');
    return context;
}