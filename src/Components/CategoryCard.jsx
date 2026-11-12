import { Link } from "react-router-dom";
import { RiCpuLine, RiHandbagLine, RiPriceTag3Line, RiShirtLine, RiVipDiamondLine } from "@remixicon/react";
import { formatCategory } from "../api/productsApi";

const categoryIcons = {
  electronics: RiCpuLine,
  jewelery: RiVipDiamondLine,
  "men's clothing": RiShirtLine,
  "women's clothing": RiHandbagLine,
};

// Uses a real product image from the API as the category picture.
export default function CategoryCard({ category, image, count }) {
  const Icon = categoryIcons[category] || RiPriceTag3Line;
  return (
    <Link
      to={`/products?category=${encodeURIComponent(category)}`}
      className="group flex flex-col items-center rounded-xl border border-gray-200 bg-white p-4 text-center transition duration-300 hover:-translate-y-1 hover:border-red-500 hover:shadow-lg"
    >
      <div className="mb-3 flex h-28 w-full items-center justify-center rounded-lg bg-gray-50 p-3">
        {image ? (
          <img src={image} alt="" loading="lazy" className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-110" />
        ) : (
          <Icon size={40} className="text-red-600" />
        )}
      </div>
      <h3 className="flex items-center gap-1.5 text-sm font-bold text-gray-900 group-hover:text-red-600">
        <Icon size={16} /> {formatCategory(category)}
      </h3>
      {count !== undefined && <span className="mt-0.5 text-xs text-gray-500">{count} products</span>}
    </Link>
  );
}
