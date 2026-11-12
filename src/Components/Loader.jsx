import { RiErrorWarningLine, RiLoader4Line, RiRefreshLine } from "@remixicon/react";

// Spinner for small waits.
export default function Loader({ label = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-500" role="status">
      <RiLoader4Line size={36} className="animate-spin text-red-600" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

// Grey placeholder shaped like a ProductCard while data loads.
export function ProductSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="h-52 bg-gray-200" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 rounded bg-gray-200" />
        <div className="h-4 w-full rounded bg-gray-200" />
        <div className="h-4 w-2/3 rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-9 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8, className = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" }) {
  return (
    <div className={`grid gap-3 sm:gap-4 ${className}`} aria-busy="true" aria-label="Loading products">
      {Array.from({ length: count }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

// Shown when an API call fails. `onRetry` re-runs the request.
export function ErrorState({ message, onRetry }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-white p-8 text-center" role="alert">
      <RiErrorWarningLine size={44} className="mb-3 text-red-600" />
      <h2 className="mb-1 text-lg font-bold text-gray-900">Something went wrong</h2>
      <p className="mb-5 text-sm text-gray-600">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
        >
          <RiRefreshLine size={18} /> Try again
        </button>
      )}
    </div>
  );
}

// Friendly "nothing here" message with an optional action (button or link).
export function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
      {Icon && (
        <span className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-600">
          <Icon size={40} />
        </span>
      )}
      <h2 className="mb-1 text-xl font-bold text-gray-900">{title}</h2>
      {message && <p className="mb-5 text-sm text-gray-600">{message}</p>}
      {action}
    </div>
  );
}
