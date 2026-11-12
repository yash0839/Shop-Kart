import { RiAddLine, RiSubtractLine } from "@remixicon/react";
import { MAX_QUANTITY } from "../context/CartContext";

// - [ 2 ] +   Used on the product page and in the cart.
export default function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="inline-flex items-center overflow-hidden rounded-lg border border-gray-300 bg-white">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= 1}
        aria-label="Decrease quantity"
        className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        <RiSubtractLine size={18} />
      </button>
      <span className="w-10 text-center text-sm font-semibold" aria-live="polite">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= MAX_QUANTITY}
        aria-label="Increase quantity"
        className="flex h-9 w-9 items-center justify-center text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        <RiAddLine size={18} />
      </button>
    </div>
  );
}
