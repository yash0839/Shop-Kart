import { Link, useParams } from "react-router-dom";
import { RiInformationLine } from "@remixicon/react";
import NotFound from "./NotFound";

// Simple demo content for the footer's support / company links (/info/:slug).
const pages = {
  faq: {
    title: "Frequently Asked Questions",
    body: [
      ["Is Shop-Kart a real store?", "No. Shop-Kart is a portfolio demo. Products come from the free FakeStore API and no real orders are fulfilled."],
      ["Where is my cart saved?", "In your browser's localStorage, so it survives a refresh but stays on this device."],
      ["Can I really pay?", "No. Checkout is a demo and never collects or processes payment details."],
    ],
  },
  shipping: {
    title: "Shipping Policy",
    body: [
      ["Free shipping", "Orders of $50 or more ship free. Smaller orders show a flat $4.99 demo shipping fee."],
      ["Delivery", "This is a demo store - nothing is actually shipped."],
    ],
  },
  returns: {
    title: "Returns & Refunds",
    body: [["Demo policy", "In a real store this page would explain return windows and refund timelines. No real purchases are made here."]],
  },
  "track-order": {
    title: "Track Order",
    body: [["Demo orders", "After placing a demo order you will see a confirmation page with your order number. Orders are stored only in this browser."]],
  },
  careers: {
    title: "Careers",
    body: [["Join us?", "Shop-Kart is a demo project, so there are no open roles - but the developer is open to opportunities!"]],
  },
  privacy: {
    title: "Privacy Policy",
    body: [["Your data", "Accounts, cart, wishlist and orders are stored only in your own browser (localStorage). Nothing is sent to a Shop-Kart server because none exists."]],
  },
  terms: {
    title: "Terms & Conditions",
    body: [["Demo use", "This website is for demonstration and learning purposes only."]],
  },
};

export default function InfoPage() {
  const { slug } = useParams();
  const page = pages[slug];
  if (!page) return <NotFound />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-6 text-3xl font-extrabold text-gray-900">{page.title}</h1>
      <div className="space-y-4">
        {page.body.map(([heading, text]) => (
          <section key={heading} className="rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="mb-1 font-bold text-gray-900">{heading}</h2>
            <p className="text-sm leading-6 text-gray-600">{text}</p>
          </section>
        ))}
      </div>
      <p className="mt-6 flex items-center gap-2 text-sm text-gray-500">
        <RiInformationLine size={18} /> Demo content for portfolio purposes.
      </p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-700">
        Back to Home
      </Link>
    </div>
  );
}
