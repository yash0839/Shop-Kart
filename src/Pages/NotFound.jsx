import { Link } from "react-router-dom";
import { RiCompass3Line } from "@remixicon/react";
import { EmptyState } from "../Components/Loader";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16">
      <EmptyState
        icon={RiCompass3Line}
        title="404 - Page not found"
        message="The page you are looking for does not exist or may have been moved."
        action={
          <div className="flex gap-3">
            <Link to="/" className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Go Home</Link>
            <Link to="/products" className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100">Browse Products</Link>
          </div>
        }
      />
    </div>
  );
}
