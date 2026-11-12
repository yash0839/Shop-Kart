import { Link, useParams } from "react-router-dom";
import { RiCheckboxCircleFill, RiFileSearchLine, RiInformationLine } from "@remixicon/react";
import { EmptyState } from "../Components/Loader";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../api/productsApi";
import paymentOptions from "../data/paymentOptions";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { orders } = useCart();
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={RiFileSearchLine}
          title="Order not found"
          message="We couldn't find this order in this browser."
          action={<Link to="/products" className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Continue Shopping</Link>}
        />
      </div>
    );
  }

  const { customer } = order;
  const paymentLabel = paymentOptions.find((option) => option.value === order.paymentMethod)?.label || order.paymentMethod;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-6 text-center">
        <RiCheckboxCircleFill size={64} className="mx-auto text-green-600" />
        <h1 className="mt-3 text-3xl font-extrabold text-gray-900">Thank you, {customer.fullName.split(" ")[0]}!</h1>
        <p className="mt-1 text-gray-600">Your demo order has been placed.</p>
        <p className="mt-3 inline-block rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white">Order {order.id}</p>
      </div>

      <p className="mb-6 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
        <RiInformationLine size={18} className="shrink-0" /> Demo order: no payment was taken and nothing will be shipped. It is stored only in this browser.
      </p>

      <div className="space-y-5 rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid gap-5 text-sm sm:grid-cols-2">
          <div>
            <h2 className="mb-1 font-bold">Shipping to</h2>
            <p className="text-gray-600">
              {customer.fullName}<br />{customer.address}<br />{customer.city}, {customer.state} {customer.postalCode}<br />{customer.country}<br />{customer.phone}
            </p>
          </div>
          <div>
            <h2 className="mb-1 font-bold">Details</h2>
            <p className="text-gray-600">
              Placed: {new Date(order.placedAt).toLocaleString()}<br />Payment: {paymentLabel}<br />Email: {customer.email}
            </p>
          </div>
        </div>

        <ul className="divide-y divide-gray-100 border-t border-gray-200">
          {order.items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 py-3">
              <img src={item.image} alt="" className="h-14 w-14 shrink-0 object-contain" />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">Qty {item.quantity} × {formatPrice(item.price)}</p>
              </div>
              <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <dl className="space-y-2 border-t border-gray-200 pt-4 text-sm">
          <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</dd></div>
          <div className="flex justify-between text-base"><dt className="font-bold">Total</dt><dd className="font-extrabold">{formatPrice(order.total)}</dd></div>
        </dl>
      </div>

      <div className="mt-6 flex justify-center gap-3">
        <Link to="/products" className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Continue Shopping</Link>
        <Link to="/" className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-semibold text-gray-800 hover:bg-gray-100">Home</Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
