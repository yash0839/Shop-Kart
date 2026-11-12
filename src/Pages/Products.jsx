import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { RiCloseLine, RiFilter3Line, RiStarFill } from "@remixicon/react";
import ProductList from "../Components/ProductList";
import SearchBar from "../Components/SearchBar";
import { ErrorState, SkeletonGrid } from "../Components/Loader";
import useFetch from "../hooks/useFetch";
import { formatCategory, getCategories, getProducts } from "../api/productsApi";

const PAGE_SIZE = 8;

const sortOptions = [
  { value: "", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Rating: High to Low" },
  { value: "rating-asc", label: "Rating: Low to High" },
];

const ratingOptions = [4, 3, 2, 1];

const Products = () => {
  const { data: products, loading, error, retry } = useFetch(getProducts);
  const { data: categories } = useFetch(getCategories);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [clearCount, setClearCount] = useState(0); // bumping this resets the price inputs

  // The URL is the single source of truth: filters survive refresh and can be shared.
  const category = searchParams.get("category") || "";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";
  const minRating = Number(searchParams.get("rating")) || 0;
  const minPrice = searchParams.get("min") || "";
  const maxPrice = searchParams.get("max") || "";
  const requestedPage = Math.max(1, Number(searchParams.get("page")) || 1);

  // Change one or more params. An empty value removes the param. Page resets unless set.
  const updateParams = (changes) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(changes).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) next.delete(key);
      else next.set(key, String(value));
    });
    if (!("page" in changes)) next.delete("page");
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
    setClearCount((count) => count + 1);
  };
  const hasFilters = Boolean(category || search || sort || minRating || minPrice || maxPrice);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const query = search.toLowerCase();
    const list = products.filter((product) => {
      if (category && product.category !== category) return false;
      if (query && !`${product.title} ${product.description} ${product.category}`.toLowerCase().includes(query)) return false;
      if (product.rating.rate < minRating) return false;
      if (minPrice !== "" && product.price < Number(minPrice)) return false;
      if (maxPrice !== "" && product.price > Number(maxPrice)) return false;
      return true;
    });

    const sorters = {
      "price-asc": (a, b) => a.price - b.price,
      "price-desc": (a, b) => b.price - a.price,
      "rating-desc": (a, b) => b.rating.rate - a.rating.rate,
      "rating-asc": (a, b) => a.rating.rate - b.rating.rate,
    };
    return sorters[sort] ? [...list].sort(sorters[sort]) : list;
  }, [products, category, search, sort, minRating, minPrice, maxPrice]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const page = Math.min(requestedPage, totalPages);
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (number) => {
    updateParams({ page: number });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filterPanel = (
    <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-5">
      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">Category</h3>
        <div className="space-y-2 text-sm">
          {["", ...(categories || [])].map((name) => (
            <label key={name || "all"} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="category"
                checked={category === name}
                onChange={() => updateParams({ category: name })}
                className="form-check-input mt-0"
              />
              {name ? formatCategory(name) : "All categories"}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">Price ($)</h3>
        {/* Uncontrolled inputs: typing is never interrupted by URL updates. The filter is
            applied when you leave the field or press Enter. `key` resets them on "Clear filters". */}
        <div className="flex items-center gap-2" key={clearCount}>
          <input
            type="number" min="0" placeholder="Min" aria-label="Minimum price"
            defaultValue={minPrice}
            onBlur={(event) => event.target.value !== minPrice && updateParams({ min: event.target.value })}
            onKeyDown={(event) => event.key === "Enter" && event.target.blur()}
            className="form-control form-control-sm"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number" min="0" placeholder="Max" aria-label="Maximum price"
            defaultValue={maxPrice}
            onBlur={(event) => event.target.value !== maxPrice && updateParams({ max: event.target.value })}
            onKeyDown={(event) => event.key === "Enter" && event.target.blur()}
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-900">Rating</h3>
        <div className="space-y-2 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="rating" checked={minRating === 0} onChange={() => updateParams({ rating: "" })} className="form-check-input mt-0" />
            Any rating
          </label>
          {ratingOptions.map((value) => (
            <label key={value} className="flex cursor-pointer items-center gap-2">
              <input type="radio" name="rating" checked={minRating === value} onChange={() => updateParams({ rating: value })} className="form-check-input mt-0" />
              {value}
              <RiStarFill size={14} className="text-amber-500" /> &amp; up
            </label>
          ))}
        </div>
      </div>

      {hasFilters && (
        <button type="button" onClick={clearFilters} className="w-full rounded-lg border border-red-600 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white">
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            {category ? formatCategory(category) : "All Products"}
          </h1>
          <p className="mt-1 text-sm text-gray-500" aria-live="polite">
            {loading ? "Loading products..." : `${filteredProducts.length} product${filteredProducts.length === 1 ? "" : "s"} found${search ? ` for "${search}"` : ""}`}
          </p>
        </div>
        {/* key resets the input when the URL search changes (e.g. from the navbar) */}
        <SearchBar
          key={search}
          defaultValue={search}
          onSearch={(query) => updateParams({ search: query })}
          className="border border-gray-300 sm:max-w-sm"
        />
      </div>

      <div className="mb-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen((open) => !open)}
          aria-expanded={filtersOpen}
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium lg:hidden"
        >
          {filtersOpen ? <RiCloseLine size={18} /> : <RiFilter3Line size={18} />} Filters
        </button>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <label htmlFor="sort" className="text-gray-600">Sort by</label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => updateParams({ sort: event.target.value })}
            className="form-select form-select-sm w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className={`${filtersOpen ? "block" : "hidden"} lg:block`}>
          <div className="lg:sticky lg:top-40">{filterPanel}</div>
        </aside>

        <section>
          {error ? (
            <ErrorState message={error} onRetry={retry} />
          ) : loading ? (
            <SkeletonGrid count={PAGE_SIZE} className="grid-cols-2 md:grid-cols-3" />
          ) : (
            <>
              <ProductList
                products={visibleProducts}
                className="grid-cols-2 md:grid-cols-3"
                emptyAction={
                  hasFilters && (
                    <button type="button" onClick={clearFilters} className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
                      Clear all filters
                    </button>
                  )
                }
              />

              {totalPages > 1 && (
                <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
                  <button
                    type="button" onClick={() => goToPage(page - 1)} disabled={page === 1}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-red-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                    <button
                      key={number} type="button" onClick={() => goToPage(number)}
                      aria-current={number === page ? "page" : undefined}
                      className={`h-10 w-10 rounded-lg border text-sm font-semibold transition ${
                        number === page ? "border-red-600 bg-red-600 text-white" : "border-gray-300 bg-white hover:border-red-600 hover:text-red-600"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                  <button
                    type="button" onClick={() => goToPage(page + 1)} disabled={page === totalPages}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-red-600 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </nav>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Products;
