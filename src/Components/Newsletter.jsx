import { useState } from "react";
import { useForm } from "react-hook-form";
import { RiMailSendLine } from "@remixicon/react";

// DEMO: the email is validated but not sent or stored anywhere.
export default function Newsletter() {
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = ({ email }) => {
    setSubscribedEmail(email);
    reset();
  };

  return (
    <section className="bg-black py-14 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600">
          <RiMailSendLine size={28} />
        </span>
        <div>
          <h2 className="text-2xl font-extrabold sm:text-3xl">Get exclusive deals in your inbox</h2>
          <p className="mt-2 text-sm text-gray-400">Subscribe to the Shop-Kart newsletter. (Demo form - nothing is sent or stored.)</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-lg">
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              aria-invalid={errors.email ? "true" : "false"}
              {...register("email", {
                required: "Please enter your email",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address" },
              })}
              className="flex-1 rounded-lg bg-white px-4 py-3 text-sm text-gray-900 outline-none"
            />
            <button type="submit" className="rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold transition hover:bg-red-700">
              Subscribe
            </button>
          </div>
          {errors.email && <p className="mt-2 text-left text-sm text-red-400" role="alert">{errors.email.message}</p>}
          {subscribedEmail && !errors.email && (
            <p className="mt-2 text-left text-sm text-green-400" role="status">Thanks! {subscribedEmail} is on the (demo) list.</p>
          )}
        </form>
      </div>
    </section>
  );
}
