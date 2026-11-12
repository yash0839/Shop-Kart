import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiDeleteBinLine, RiShoppingCart2Line, RiTruckLine } from "@remixicon/react";
import QuantitySelector from "../Components/QuantitySelector";
import { EmptyState } from "../Components/Loader";
import { FREE_SHIPPING_THRESHOLD, useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatCategory, formatPrice } from "../api/productsApi";

const Cart = () => {
  const { items, cartCount, subtotal, shipping, total, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={RiShoppingCart2Line}
          title="Your cart is empty"
          message="Looks like you haven't added anything yet. Explore our products and find something you love."
          action={<Link to="/products" className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Start Shopping</Link>}
        />
      </div>
    );
  }

  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-end justify-between">
        <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart <span className="text-lg font-medium text-gray-500">({cartCount} item{cartCount === 1 ? "" : "s"})</span></h1>
        <button type="button" onClick={clearCart} className="text-sm font-medium text-gray-500 hover:text-red-600">Clear cart</button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
        <ul className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 p-4 sm:p-5">
              <Link to={`/products/${item.id}`} className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-2 sm:h-28 sm:w-28">
                <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div>
                  <Link to={`/products/${item.id}`} className="line-clamp-2 text-sm font-semibold text-gray-900 hover:text-red-600 sm:text-base">{item.title}</Link>
                  <p className="text-xs text-gray-400">{formatCategory(item.category)}</p>
                </div>
                <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                  <QuantitySelector quantity={item.quantity} onIncrease={() => increaseQuantity(item.id)} onDecrease={() => decreaseQuantity(item.id)} />
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                    {item.quantity > 1 && <p className="text-xs text-gray-400">{formatPrice(item.price)} each</p>}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.title} from cart`}
                className="self-start rounded-full p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600"
              >
                <RiDeleteBinLine size={20} />
              </button>
            </li>
          ))}
        </ul>

        <aside className="h-fit space-y-4 rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-40">
          <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd className="font-medium">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-extrabold">{formatPrice(total)}</dd></div>
          </dl>

          {amountToFreeShipping > 0 && (
            <p className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700">
              <RiTruckLine size={18} className="shrink-0" /> Add {formatPrice(amountToFreeShipping)} more for free shipping!
            </p>
          )}

          <Link to="/checkout" className="block rounded-lg bg-red-600 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700">
            Proceed to Checkout
          </Link>
          {!user && <p className="text-center text-xs text-gray-500">You will be asked to log in (demo account) before checkout.</p>}
          <Link to="/products" className="flex items-center justify-center gap-1 text-sm font-medium text-gray-600 hover:text-red-600">
            <RiArrowLeftLine size={16} /> Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
