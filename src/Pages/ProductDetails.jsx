import { useCallback, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  RiArrowLeftLine,
  RiCheckboxCircleFill,
  RiHeart3Fill,
  RiHeart3Line,
  RiRefund2Line,
  RiShoppingCart2Line,
  RiTruckLine,
} from "@remixicon/react";
import { Rating } from "../Components/ProductCard";
import ProductList from "../Components/ProductList";
import QuantitySelector from "../Components/QuantitySelector";
import Loader, { ErrorState, SkeletonGrid } from "../Components/Loader";
import useFetch from "../hooks/useFetch";
import { useCart, MAX_QUANTITY } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { formatCategory, formatPrice, getDemoOffer, getProductById, getProductsByCategory } from "../api/productsApi";

function RelatedProducts({ category, currentId }) {
  const fetchRelated = useCallback(() => getProductsByCategory(category), [category]);
  const { data, loading, error, retry } = useFetch(fetchRelated);

  if (error) return <ErrorState message={error} onRetry={retry} />;
  if (loading) return <SkeletonGrid count={4} className="grid-cols-2 lg:grid-cols-4" />;

  const related = data.filter((product) => product.id !== currentId).slice(0, 4);
  if (related.length === 0) return null;
  return <ProductList products={related} className="grid-cols-2 lg:grid-cols-4" />;
}

function ProductView({ id }) {
  const fetchProduct = useCallback(() => getProductById(id), [id]);
  const { data: product, loading, error, retry } = useFetch(fetchProduct);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  if (loading) return <Loader label="Loading product..." />;
  if (error) {
    return (
      <div className="py-10">
        <ErrorState message={error} onRetry={retry} />
        <p className="mt-4 text-center"><Link to="/products" className="text-sm font-semibold text-red-600 hover:underline">Back to products</Link></p>
      </div>
    );
  }

  const { discountPercent, listPrice } = getDemoOffer(product);
  const wished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/checkout");
  };

  return (
    <>
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-red-600">Home</Link> /
        <Link to="/products" className="hover:text-red-600">Products</Link> /
        <Link to={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-red-600">{formatCategory(product.category)}</Link>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="flex h-96 items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 lg:h-[34rem]">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600">{formatCategory(product.category)}</span>
          <h1 className="mt-2 text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl">{product.title}</h1>
          <div className="mt-3"><Rating rate={product.rating?.rate} count={product.rating?.count} size={18} /></div>
          <p className="mt-1 text-xs text-gray-500">{product.rating?.count} customer reviews</p>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            <span className="text-4xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
            <span className="text-lg text-gray-400 line-through">{formatPrice(listPrice)}</span>
            <span className="rounded bg-red-600 px-2 py-0.5 text-sm font-bold text-white">{discountPercent}% OFF</span>
          </div>
          <p className="mt-1 text-xs text-gray-400">Demo discount - the real price is the API price shown above.</p>

          <p className="mt-5 text-sm leading-7 text-gray-600">{product.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-900">Quantity</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity((current) => Math.min(current + 1, MAX_QUANTITY))}
              onDecrease={() => setQuantity((current) => Math.max(current - 1, 1))}
            />
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={handleAddToCart} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:flex-none">
              <RiShoppingCart2Line size={18} /> Add to Cart
            </button>
            <button type="button" onClick={handleBuyNow} className="flex-1 rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 sm:flex-none">
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product)}
              aria-pressed={wished}
              className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold transition hover:border-red-600 hover:text-red-600"
            >
              {wished ? <RiHeart3Fill size={18} className="text-red-600" /> : <RiHeart3Line size={18} />}
              {wished ? "In Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          {added && (
            <p className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600" role="status">
              <RiCheckboxCircleFill size={18} /> Added to your cart. <Link to="/cart" className="underline">View cart</Link>
            </p>
          )}

          <ul className="mt-8 space-y-3 border-t border-gray-200 pt-6 text-sm text-gray-600">
            <li className="flex items-center gap-3"><RiTruckLine size={20} className="text-red-600" /> Free shipping on orders over $50</li>
            <li className="flex items-center gap-3"><RiRefund2Line size={20} className="text-red-600" /> Easy returns (demo policy)</li>
          </ul>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Related Products</h2>
        <RelatedProducts category={product.category} currentId={product.id} />
      </section>
    </>
  );
}

// `key={id}` remounts ProductView when you click a related product, so all state resets cleanly.
export default function ProductDetails() {
  const { id } = useParams();
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Link to="/products" className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600 lg:hidden">
        <RiArrowLeftLine size={16} /> Back to products
      </Link>
      <ProductView key={id} id={id} />
    </div>
  );
}
