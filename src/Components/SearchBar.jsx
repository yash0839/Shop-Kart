import { useState } from "react";
import { RiSearchLine } from "@remixicon/react";

// Reusable search box. The parent decides what happens via onSearch(query).
export default function SearchBar({
  defaultValue = "",
  onSearch,
  placeholder = "Search for products...",
  className = "",
}) {
  const [query, setQuery] = useState(defaultValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`flex w-full overflow-hidden rounded-lg bg-white shadow-sm ${className}`}
    >
      <input
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="min-w-0 flex-1 px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-400"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex items-center bg-red-600 px-4 text-white transition hover:bg-red-700"
      >
        <RiSearchLine size={20} />
      </button>
    </form>
  );
}
