import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RiBankCardLine, RiHandCoinLine, RiInformationLine, RiQrCodeLine, RiShoppingCart2Line } from "@remixicon/react";
import { EmptyState } from "../Components/Loader";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { formatPrice } from "../api/productsApi";
import paymentOptions from "../data/paymentOptions";

const paymentIcons = { hand: RiHandCoinLine, qr: RiQrCodeLine, card: RiBankCardLine };

const countries = ["India", "United States", "United Kingdom", "Canada", "Australia"];

function Field({ label, id, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="form-label text-sm font-semibold">{label}</label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600" role="alert">{error.message}</p>}
    </div>
  );
}

const Checkout = () => {
  const { items, subtotal, shipping, total, placeOrder } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { fullName: user?.name || "", email: user?.email || "", country: "India", paymentMethod: "cod" },
  });

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <EmptyState
          icon={RiShoppingCart2Line}
          title="Nothing to check out"
          message="Your cart is empty. Add some products first."
          action={<Link to="/products" className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Browse Products</Link>}
        />
      </div>
    );
  }

  // DEMO: saves the order in localStorage only. No card details are collected anywhere.
  const onSubmit = (data) => {
    const { paymentMethod, ...rest } = data;
    const order = placeOrder({ customer: rest, paymentMethod, userEmail: user?.email });
    navigate(`/order-confirmation/${order.id}`, { replace: true });
  };

  const inputClass = (error) => `form-control ${error ? "is-invalid" : ""}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="mb-2 text-3xl font-extrabold text-gray-900">Checkout</h1>
      <p className="mb-6 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
        <RiInformationLine size={18} className="shrink-0" /> Demo checkout: no payment is taken and nothing is shipped. The order is only saved in this browser.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-6 lg:grid-cols-[1fr_24rem]">
        <div className="space-y-6">
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold">1. Customer Details</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="fullName" error={errors.fullName}>
                <input id="fullName" autoComplete="name" className={inputClass(errors.fullName)} {...register("fullName", { required: "Full name is required" })} />
              </Field>
              <Field label="Email" id="email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" className={inputClass(errors.email)}
                  {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" } })} />
              </Field>
              <Field label="Phone number" id="phone" error={errors.phone}>
                <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile number" className={inputClass(errors.phone)}
                  {...register("phone", { required: "Phone number is required", pattern: { value: /^\d{10}$/, message: "Enter a 10-digit phone number" } })} />
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold">2. Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field label="Address" id="address" error={errors.address}>
                  <input id="address" autoComplete="street-address" placeholder="House no., street, area" className={inputClass(errors.address)}
                    {...register("address", { required: "Address is required", minLength: { value: 6, message: "Please enter a complete address" } })} />
                </Field>
              </div>
              <Field label="City" id="city" error={errors.city}>
                <input id="city" autoComplete="address-level2" className={inputClass(errors.city)} {...register("city", { required: "City is required" })} />
              </Field>
              <Field label="State / Province" id="state" error={errors.state}>
                <input id="state" autoComplete="address-level1" className={inputClass(errors.state)} {...register("state", { required: "State is required" })} />
              </Field>
              <Field label="Postal code" id="postalCode" error={errors.postalCode}>
                <input id="postalCode" autoComplete="postal-code" className={inputClass(errors.postalCode)}
                  {...register("postalCode", { required: "Postal code is required", pattern: { value: /^[A-Za-z0-9 -]{4,10}$/, message: "Enter a valid postal code" } })} />
              </Field>
              <Field label="Country" id="country" error={errors.country}>
                <select id="country" className="form-select" {...register("country", { required: true })}>
                  {countries.map((country) => <option key={country}>{country}</option>)}
                </select>
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-bold">3. Payment Method</h2>
            <div className="space-y-3">
              {paymentOptions.map(({ value, label, icon }) => {
                const Icon = paymentIcons[icon];
                return (
                <label key={value} className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-4 transition hover:border-red-500 has-checked:border-red-600 has-checked:bg-red-50">
                  <input type="radio" value={value} className="form-check-input mt-0" {...register("paymentMethod", { required: true })} />
                  <Icon size={22} className="text-red-600" />
                  <span className="text-sm font-medium">{label}</span>
                </label>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-gray-500">No card, UPI or bank details are requested or stored by this demo.</p>
          </section>
        </div>

        <aside className="h-fit space-y-4 rounded-xl border border-gray-200 bg-white p-6 lg:sticky lg:top-40">
          <h2 className="text-lg font-bold">Order Summary</h2>
          <ul className="max-h-72 divide-y divide-gray-100 overflow-y-auto">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3 py-3">
                <img src={item.image} alt="" className="h-14 w-14 shrink-0 object-contain" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-gray-500">Qty {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 border-t border-gray-200 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-gray-600">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-600">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base"><dt className="font-bold">Total</dt><dd className="font-extrabold">{formatPrice(total)}</dd></div>
          </dl>
          <button type="submit" className="btn btn-danger w-full py-3 font-semibold">Place Demo Order</button>
          <Link to="/cart" className="block text-center text-sm text-gray-600 hover:text-red-600">Back to cart</Link>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;
