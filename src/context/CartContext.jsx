import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const CartContext = createContext(null);

export const MAX_QUANTITY = 10;
export const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 4.99;

export function CartProvider({ children }) {
  const [storedItems, setItems] = useLocalStorage("shopkart_cart", []);
  const [storedOrders, setOrders] = useLocalStorage("shopkart_orders", []);

  // Guard against corrupted localStorage data.
  const items = Array.isArray(storedItems) ? storedItems : [];
  const orders = Array.isArray(storedOrders) ? storedOrders : [];

  // Every update uses the functional form (prev => ...) so we never read stale state.
  const addToCart = (product, quantity = 1) => {
    setItems((previous) => {
      const list = Array.isArray(previous) ? previous : [];
      const existing = list.find((item) => item.id === product.id);
      if (existing) {
        return list.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + quantity, MAX_QUANTITY) }
            : item
        );
      }
      // Only keep the fields the cart needs (id is the real API id, image is stored too).
      return [
        ...list,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: Math.min(quantity, MAX_QUANTITY),
        },
      ];
    });
  };

  const removeFromCart = (id) => setItems((previous) => previous.filter((item) => item.id !== id));

  const updateQuantity = (id, quantity) => {
    const safeQuantity = Math.max(1, Math.min(quantity, MAX_QUANTITY));
    setItems((previous) =>
      previous.map((item) => (item.id === id ? { ...item, quantity: safeQuantity } : item))
    );
  };

  const increaseQuantity = (id) =>
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) } : item
      )
    );

  const decreaseQuantity = (id) =>
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );

  const clearCart = () => setItems([]);

  const getQuantity = (id) => items.find((item) => item.id === id)?.quantity ?? 0;

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = items.length === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  // DEMO ORDER: saved in localStorage only. No payment is processed and no server is called.
  const placeOrder = (details) => {
    const order = {
      id: `SK-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      total,
      isDemo: true,
      ...details,
    };
    setOrders((previous) => [order, ...(Array.isArray(previous) ? previous : [])]);
    setItems([]);
    return order;
  };

  const value = {
    items,
    orders,
    cartCount,
    subtotal,
    shipping,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    getQuantity,
    placeOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
