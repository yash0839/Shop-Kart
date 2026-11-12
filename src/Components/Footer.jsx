import { Link } from "react-router-dom";
import {
  RiArrowRightSLine,
  RiBankCardLine,
  RiFacebookFill,
  RiInstagramLine,
  RiMailLine,
  RiMapPinLine,
  RiMastercardLine,
  RiPaypalLine,
  RiPhoneLine,
  RiQrCodeLine,
  RiShieldCheckLine,
  RiTwitterXFill,
  RiVisaLine,
  RiYoutubeFill,
} from "@remixicon/react";

const socialLinks = [
  { name: "Facebook", Icon: RiFacebookFill, url: "https://www.facebook.com/" },
  { name: "Instagram", Icon: RiInstagramLine, url: "https://www.instagram.com/" },
  { name: "X", Icon: RiTwitterXFill, url: "https://x.com/" },
  { name: "YouTube", Icon: RiYoutubeFill, url: "https://www.youtube.com/" },
];

const shopLinks = [
  { label: "All Products", to: "/products" },
  { label: "Electronics", to: "/products?category=electronics" },
  { label: "Jewelery", to: "/products?category=jewelery" },
  { label: "Men's Clothing", to: "/products?category=men's clothing" },
  { label: "Women's Clothing", to: "/products?category=women's clothing" },
];

const supportLinks = [
  { label: "Contact Us", to: "/contact" },
  { label: "FAQs", to: "/info/faq" },
  { label: "Shipping Policy", to: "/info/shipping" },
  { label: "Returns & Refunds", to: "/info/returns" },
  { label: "Track Order", to: "/info/track-order" },
];

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Careers", to: "/info/careers" },
  { label: "Privacy Policy", to: "/info/privacy" },
  { label: "Terms & Conditions", to: "/info/terms" },
  { label: "Wishlist", to: "/wishlist" },
];

const paymentIcons = [
  { name: "Visa", Icon: RiVisaLine },
  { name: "Mastercard", Icon: RiMastercardLine },
  { name: "PayPal", Icon: RiPaypalLine },
  { name: "UPI", Icon: RiQrCodeLine },
  { name: "Debit / Credit card", Icon: RiBankCardLine },
];

function LinkColumn({ title, links }) {
  return (
    <div>
      <h3 className="mb-4 text-base font-bold text-white">{title}</h3>
      <ul className="flex flex-col gap-2.5 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            <Link to={link.to} className="flex items-center transition hover:text-red-400">
              <RiArrowRightSLine size={16} className="text-red-500" /> {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Footer = () => (
  <footer className="bg-neutral-950 text-gray-400">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-1">
        <Link to="/" className="mb-4 inline-block text-3xl font-extrabold text-white">
          Shop<span className="text-red-500">-Kart</span>
        </Link>
        <p className="mb-5 text-sm leading-6">
          Your one-stop destination for quality products at the best prices.
        </p>
        <ul className="mb-5 space-y-2 text-sm">
          <li className="flex items-start gap-2"><RiMapPinLine size={16} className="mt-0.5 shrink-0 text-red-500" /> 123 Shopping Street, Bangalore</li>
          <li><a href="tel:+919876543210" className="flex items-center gap-2 hover:text-red-400"><RiPhoneLine size={16} className="text-red-500" /> +91 98765 43210</a></li>
          <li><a href="mailto:support@shopkart.com" className="flex items-center gap-2 hover:text-red-400"><RiMailLine size={16} className="text-red-500" /> support@shopkart.com</a></li>
        </ul>
        <div className="flex gap-2.5">
          {socialLinks.map(({ name, Icon, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-white transition duration-300 hover:-translate-y-1 hover:bg-red-600"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>

      <LinkColumn title="Shop" links={shopLinks} />
      <LinkColumn title="Customer Support" links={supportLinks} />
      <LinkColumn title="Company" links={companyLinks} />

      <div>
        <h3 className="mb-4 text-base font-bold text-white">We Accept</h3>
        <div className="grid grid-cols-3 gap-2">
          {paymentIcons.map(({ name, Icon }) => (
            <span key={name} title={name} className="flex h-11 items-center justify-center rounded-md bg-white text-neutral-800">
              <Icon size={26} aria-label={name} />
            </span>
          ))}
        </div>
        <p className="mt-4 flex items-center gap-2 text-sm text-green-400">
          <RiShieldCheckLine size={20} /> Safe browsing
        </p>
        <p className="mt-2 text-xs text-gray-500">Icons are for display only. This demo store does not process payments.</p>
      </div>
    </div>

    <div className="border-t border-neutral-800 px-4 py-5 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} <span className="font-semibold text-white">Shop-Kart</span>. All rights reserved. A portfolio demo project.
    </div>
  </footer>
);

export default Footer;
