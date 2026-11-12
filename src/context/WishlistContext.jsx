import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [storedItems, setItems] = useLocalStorage("shopkart_wishlist", []);
  const items = Array.isArray(storedItems) ? storedItems : [];

  const isInWishlist = (id) => items.some((item) => item.id === id);

  const addToWishlist = (product) =>
    setItems((previous) => {
      if (previous.some((item) => item.id === product.id)) return previous;
      return [
        ...previous,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          category: product.category,
          description: product.description,
          rating: product.rating,
        },
      ];
    });

  const removeFromWishlist = (id) => setItems((previous) => previous.filter((item) => item.id !== id));

  const toggleWishlist = (product) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  const value = {
    items,
    wishlistCount: items.length,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return context;
}
