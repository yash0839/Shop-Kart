import { useMemo } from "react";
import { Link } from "react-router-dom";
import { RiArrowRightLine, RiCustomerService2Line, RiRefund2Line, RiTruckLine, RiVerifiedBadgeLine } from "@remixicon/react";
import Hero from "../Components/Hero";
import CategoryCard from "../Components/CategoryCard";
import ProductList from "../Components/ProductList";
import Brand from "../Components/Brand";
import Newsletter from "../Components/Newsletter";
import { ErrorState, SkeletonGrid } from "../Components/Loader";
import useFetch from "../hooks/useFetch";
import { getCategories, getProducts } from "../api/productsApi";
import brands from "../data/Brand";

const perks = [
  { Icon: RiTruckLine, title: "Free Shipping", text: "On orders over $50" },
  { Icon: RiRefund2Line, title: "Easy Returns", text: "Hassle-free policy" },
  { Icon: RiCustomerService2Line, title: "Friendly Support", text: "Mon-Sat, 9 AM-6 PM" },
  { Icon: RiVerifiedBadgeLine, title: "Quality Picks", text: "Top-rated products" },
];

const promos = [
  { title: "Electronics Fest", text: "Up to 25% off gadgets", to: "/products?category=electronics", style: "from-red-700 to-red-500" },
  { title: "Jewelery Sale", text: "Shine for less - up to 30% off", to: "/products?category=jewelery", style: "from-neutral-900 to-neutral-700" },
  { title: "Fashion Week", text: "New styles, great prices", to: "/products?category=women's clothing", style: "from-red-900 to-neutral-900" },
];

function SectionHeader({ title, subtitle, to }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="flex shrink-0 items-center gap-1 text-sm font-semibold text-red-600 hover:underline">
          View all <RiArrowRightLine size={16} />
        </Link>
      )}
    </div>
  );
}

const Home = () => {
  const { data: products, loading, error, retry } = useFetch(getProducts);
  const { data: categories } = useFetch(getCategories);

  const sections = useMemo(() => {
    if (!products) return { trending: [], featured: [], bestSelling: [], categoryCards: [] };
    const byReviews = [...products].sort((a, b) => b.rating.count - a.rating.count);
    const byRating = [...products].sort((a, b) => b.rating.rate - a.rating.rate || b.rating.count - a.rating.count);
    const newest = [...products].sort((a, b) => b.id - a.id);

    const bestSelling = byReviews.slice(0, 4);
    const bestIds = new Set(bestSelling.map((product) => product.id));
    const categoryCards = (categories || []).map((name) => {
      const inCategory = byRating.filter((product) => product.category === name);
      return { name, image: inCategory[0]?.image, count: inCategory.length };
    });

    return {
      trending: newest.slice(0, 4),
      featured: byRating.filter((product) => !bestIds.has(product.id)).slice(0, 4),
      bestSelling,
      categoryCards,
    };
  }, [products, categories]);

  return (
    <>
      <Hero products={products || []} loading={loading} />

      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-5 lg:grid-cols-4">
          {perks.map(({ Icon, title, text }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600"><Icon size={22} /></span>
              <div>
                <p className="text-sm font-bold text-gray-900">{title}</p>
                <p className="text-xs text-gray-500">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-14 px-4 py-12">
        {error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : (
          <>
            <section>
              <SectionHeader title="Shop by Category" subtitle="Find what you need faster" to="/products" />
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                {loading || sections.categoryCards.length === 0
                  ? [0, 1, 2, 3].map((slot) => <div key={slot} className="h-44 animate-pulse rounded-xl bg-gray-200" />)
                  : sections.categoryCards.map((category) => (
                      <CategoryCard key={category.name} category={category.name} image={category.image} count={category.count} />
                    ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Trending Now" subtitle="Our newest arrivals" to="/products" />
              {loading ? <SkeletonGrid count={4} className="grid-cols-2 lg:grid-cols-4" /> : <ProductList products={sections.trending} className="grid-cols-2 lg:grid-cols-4" />}
            </section>

            <section>
              <SectionHeader title="Special Offers" subtitle="Demo promotions - discounts are illustrative" />
              <div className="grid gap-4 md:grid-cols-3">
                {promos.map((promo) => (
                  <Link
                    key={promo.title}
                    to={promo.to}
                    className={`group flex min-h-40 flex-col justify-end rounded-2xl bg-linear-to-br p-6 text-white transition hover:-translate-y-1 hover:shadow-xl ${promo.style}`}
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-red-200">Limited time</span>
                    <h3 className="text-2xl font-extrabold">{promo.title}</h3>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-100">
                      {promo.text} <RiArrowRightLine size={16} className="transition group-hover:translate-x-1" />
                    </p>
                  </Link>
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Featured Products" subtitle="Hand-picked, highest rated" to="/products?sort=rating-desc" />
              {loading ? <SkeletonGrid count={4} className="grid-cols-2 lg:grid-cols-4" /> : <ProductList products={sections.featured} className="grid-cols-2 lg:grid-cols-4" />}
            </section>

            <section>
              <SectionHeader title="Best Sellers" subtitle="Most reviewed by customers" to="/products" />
              {loading ? <SkeletonGrid count={4} className="grid-cols-2 lg:grid-cols-4" /> : <ProductList products={sections.bestSelling} className="grid-cols-2 lg:grid-cols-4" />}
            </section>
          </>
        )}

        <section>
          <SectionHeader title="Popular Brands" subtitle="Demo list for layout purposes - not API data" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {brands.slice(0, 10).map((brand) => (
              <Brand key={brand.id} name={brand.name} />
            ))}
          </div>
        </section>
      </div>

      <Newsletter />
    </>
  );
};

export default Home;
