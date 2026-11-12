import { Link, useNavigate } from "react-router-dom";
import { RiArrowRightLine, RiShieldCheckLine, RiTruckLine } from "@remixicon/react";
import SearchBar from "./SearchBar";
import { formatPrice } from "../api/productsApi";

// Full-width banner. The images on the right are real products from the API.
export default function Hero({ products = [], loading = false }) {
  const navigate = useNavigate();
  const showcase = [...products].sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);

  const handleSearch = (query) => navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-black via-neutral-900 to-red-900 text-white">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="mb-4 inline-block rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
            Season sale · up to 30% off (demo)
          </span>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Shop smarter. <span className="text-red-500">Live better.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-gray-300">
            Discover electronics, jewelery and fashion at great prices - all in one place.
          </p>

          <SearchBar onSearch={handleSearch} placeholder="Search for products, categories..." className="mt-7 max-w-xl" />

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-700">
              Shop Now <RiArrowRightLine size={18} />
            </Link>
            <Link to="/products?sort=rating-desc" className="inline-flex items-center rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold transition hover:bg-white hover:text-black">
              Top Rated
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-300">
            <span className="flex items-center gap-2"><RiTruckLine size={18} className="text-red-500" /> Free shipping over $50</span>
            <span className="flex items-center gap-2"><RiShieldCheckLine size={18} className="text-red-500" /> Easy returns</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {loading || showcase.length === 0
            ? [0, 1, 2].map((slot) => <div key={slot} className="h-48 animate-pulse rounded-2xl bg-white/10 sm:h-64" />)
            : showcase.map((product, index) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className={`group flex flex-col rounded-2xl bg-white p-3 text-gray-900 shadow-xl transition hover:-translate-y-1 ${index === 1 ? "sm:mt-8" : ""}`}
                >
                  <div className="flex h-32 items-center justify-center sm:h-44">
                    <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain transition group-hover:scale-105" />
                  </div>
                  <span className="mt-2 line-clamp-1 text-xs font-semibold">{product.title}</span>
                  <span className="text-sm font-bold text-red-600">{formatPrice(product.price)}</span>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
