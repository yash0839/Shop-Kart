import React from 'react';
import { Link } from 'react-router-dom';

import {
  RiFacebookFill,
  RiInstagramLine,
  RiTwitterXFill,
  RiYoutubeFill,
  RiShieldCheckLine,
  RiArrowRightSLine,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine
} from '@remixicon/react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-300">

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">

        {/* Brand */}
        <div>
          <h2 className="mb-4 text-3xl font-extrabold text-white">
            Shop<span className="text-red-500">Kart</span>
          </h2>

          <p className="mb-5 text-sm leading-6 text-gray-400">
            Your one-stop destination for quality products at the best prices.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3">
            {[
              { Icon: RiFacebookFill, link: '#' },
              { Icon: RiInstagramLine, link: '#' },
              { Icon: RiTwitterXFill, link: '#' },
              { Icon: RiYoutubeFill, link: '#' },
            ].map(({ Icon, link }, index) => (
              <a
                key={index}
                href={link}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-500"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Shop</h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/product" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> All Products
            </Link>
            <Link to="/product" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Categories
            </Link>
            <Link to="/product" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> New Arrivals
            </Link>
            <Link to="/product" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Best Sellers
            </Link>
            <Link to="/product" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Deals of the Day
            </Link>
          </div>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">
            Customer Service
          </h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/contect" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Contact Us
            </Link>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> FAQs
            </a>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Shipping Policy
            </a>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Returns & Refunds
            </a>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Track Order
            </a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">Company</h3>

          <div className="flex flex-col gap-3 text-sm">
            <Link to="/about" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> About Us
            </Link>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Careers
            </a>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Privacy Policy
            </a>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Terms & Conditions
            </a>
            <a href="#" className="flex items-center hover:text-red-400">
              <RiArrowRightSLine size={18} /> Sell on ShopKart
            </a>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="mb-5 text-lg font-bold text-white">We Accept</h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex h-12 items-center justify-center rounded bg-white p-2">
              <img src="/images/visa.png" alt="Visa" className="max-h-8 object-contain" />
            </div>

            <div className="flex h-12 items-center justify-center rounded bg-white p-2">
              <img src="/images/mastercard.png" alt="Mastercard" className="max-h-8 object-contain" />
            </div>

            <div className="flex h-12 items-center justify-center rounded bg-white p-2">
              <img src="/images/upi.png" alt="UPI" className="max-h-8 object-contain" />
            </div>

            <div className="flex h-12 items-center justify-center rounded bg-white p-2">
              <img src="/images/paytm.png" alt="Paytm" className="max-h-8 object-contain" />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-sm text-green-400">
            <RiShieldCheckLine size={22} />
            <span>100% Secure Payments</span>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800 px-5 py-5 text-center text-sm text-gray-500">
        © 2026 <span className="font-semibold text-white">ShopKart</span>.
        All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
