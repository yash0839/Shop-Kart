import { RiSearchEyeLine } from "@remixicon/react";
import ProductCard from "./ProductCard";
import { EmptyState } from "./Loader";

// Responsive grid of ProductCards, with an empty state when there is nothing to show.
export default function ProductList({
  products,
  className = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  emptyTitle = "No products found",
  emptyMessage = "Try changing your search or filters.",
  emptyAction,
}) {
  if (products.length === 0) {
    return <EmptyState icon={RiSearchEyeLine} title={emptyTitle} message={emptyMessage} action={emptyAction} />;
  }
  return (
    <div className={`grid gap-3 sm:gap-4 ${className}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
