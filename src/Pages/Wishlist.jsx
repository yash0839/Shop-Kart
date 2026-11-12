import { Link } from "react-router-dom";
import { RiHeart3Line, RiShoppingCart2Line } from "@remixicon/react";
import ProductCard from "../Components/ProductCard";
import { EmptyState } from "../Components/Loader";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={RiHeart3Line}
          title="Your wishlist is empty"
          message="Tap the heart on any product to save it here for later."
          action={<Link to="/products" className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Browse Products</Link>}
        />
      </div>
    );
  }

  // Moving to cart = add to the cart, then remove from the wishlist.
  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">
        My Wishlist <span className="text-lg font-medium text-gray-500">({items.length})</span>
      </h1>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} hideAddToCart>
            <button
              type="button"
              onClick={() => moveToCart(product)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RiShoppingCart2Line size={18} /> Move to Cart
            </button>
            <button
              type="button"
              onClick={() => removeFromWishlist(product.id)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-red-600 hover:text-red-600"
            >
              Remove
            </button>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
