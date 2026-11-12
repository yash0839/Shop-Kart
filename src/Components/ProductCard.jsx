import { Link } from "react-router-dom";
import { RiHeart3Fill, RiHeart3Line, RiShoppingCart2Line, RiStarFill, RiStarHalfFill, RiStarLine } from "@remixicon/react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatCategory, formatPrice, getDemoOffer } from "../api/productsApi";

// Five stars + review count. Exported because the product details page uses it too.
export function Rating({ rate = 0, count, size = 14 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rate} out of 5`}>
      <div className="flex text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => {
          if (rate >= star - 0.25) return <RiStarFill key={star} size={size} />;
          if (rate >= star - 0.75) return <RiStarHalfFill key={star} size={size} />;
          return <RiStarLine key={star} size={size} />;
        })}
      </div>
      <span className="text-xs text-gray-500">
        {rate.toFixed(1)}
        {count !== undefined && ` (${count})`}
      </span>
    </div>
  );
}

// `children` appears at the bottom of the card (the Wishlist page puts "Move to cart" there).
export default function ProductCard({ product, hideAddToCart = false, children }) {
  const { addToCart, getQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { discountPercent, listPrice } = getDemoOffer(product);
  const wished = isInWishlist(product.id);
  const inCart = getQuantity(product.id);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative">
        <Link to={`/products/${product.id}`} className="flex h-44 items-center justify-center bg-white p-5 sm:h-52" aria-label={`View ${product.title}`}>
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-0.5 text-xs font-bold text-white">
          -{discountPercent}%
        </span>
        <button
          type="button"
          onClick={() => toggleWishlist(product)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow transition hover:text-red-600"
        >
          {wished ? <RiHeart3Fill size={20} className="text-red-600" /> : <RiHeart3Line size={20} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-gray-100 p-4">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-gray-400">
          {formatCategory(product.category)}
        </span>
        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-gray-900 transition hover:text-red-600"
        >
          {product.title}
        </Link>
        <Rating rate={product.rating?.rate} count={product.rating?.count} />

        <div className="mt-auto flex flex-wrap items-baseline gap-x-2 pt-1">
          <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
          <span className="text-xs text-gray-400 line-through" title="Demo list price">{formatPrice(listPrice)}</span>
        </div>

        {!hideAddToCart && (
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-600"
          >
            <RiShoppingCart2Line size={18} />
            {inCart > 0 ? `Add more (${inCart} in cart)` : "Add to Cart"}
          </button>
        )}
        {children}
      </div>
    </article>
  );
}
