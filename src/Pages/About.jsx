import { Link } from "react-router-dom";
import {
  RiArrowRightLine,
  RiCustomerService2Line,
  RiEyeLine,
  RiHandHeartLine,
  RiMedalLine,
  RiPriceTag3Line,
  RiRefund2Line,
  RiShoppingBag3Line,
  RiStore2Line,
  RiTargetLine,
  RiTruckLine,
} from "@remixicon/react";
import Brand from "../Components/Brand";
import brands from "../data/Brand";

const whyChooseUs = [
  { Icon: RiPriceTag3Line, title: "Best Prices", text: "Quality products at prices that respect your budget." },
  { Icon: RiMedalLine, title: "Quality Assured", text: "We highlight top-rated products that customers trust." },
  { Icon: RiTruckLine, title: "Fast Delivery", text: "Free shipping on orders over $50." },
  { Icon: RiHandHeartLine, title: "Customer First", text: "Friendly help whenever you need it." },
];

const services = [
  { Icon: RiStore2Line, title: "Wide Selection", text: "Electronics, jewelery, men's and women's fashion in one place." },
  { Icon: RiRefund2Line, title: "Easy Returns", text: "A simple, hassle-free return process." },
  { Icon: RiCustomerService2Line, title: "Customer Support", text: "Monday-Saturday, 9 AM-6 PM." },
  { Icon: RiShoppingBag3Line, title: "Wishlist & Cart", text: "Save favourites and come back to them anytime." },
];

function InfoCard({ Icon, title, text }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
      <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-50 text-red-600"><Icon size={26} /></span>
      <h3 className="mb-1 text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm leading-6 text-gray-600">{text}</p>
    </div>
  );
}

const About = () => (
  <>
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
            <RiShoppingBag3Line size={16} /> Welcome to Shop-Kart
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900">About Us</h1>
          <h2 className="mt-3 text-xl font-semibold text-gray-600">
            Making everyday shopping simpler, faster and more enjoyable.
          </h2>
          <p className="mt-5 leading-7 text-gray-600">
            At Shop-Kart, we believe great products should be accessible to everyone. We are an online
            shopping destination offering a wide range of high-quality products at great prices.
          </p>
          <p className="mt-3 leading-7 text-gray-600">
            From fashion and electronics to jewelery and more - we&apos;re here to make shopping easier, better,
            and more delightful for you.
          </p>
          <Link to="/products" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700">
            Shop Now <RiArrowRightLine size={18} />
          </Link>
        </div>

        <div className="rounded-2xl bg-linear-to-br from-black to-red-900 p-10 text-center text-white">
          <span className="mx-auto mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
            <RiShoppingBag3Line size={52} />
          </span>
          <h3 className="text-2xl font-extrabold">Shop Smarter, Live Better</h3>
          <p className="mt-2 text-gray-300">Discover products you&apos;ll love, all in one place.</p>
          <p className="mt-6 text-xs text-gray-400">Shop-Kart is a portfolio demo project built with React.</p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-8">
          <RiTargetLine size={36} className="mb-3 text-red-600" />
          <h2 className="mb-2 text-2xl font-extrabold text-gray-900">Our Mission</h2>
          <p className="leading-7 text-gray-600">To make online shopping simple, affordable and trustworthy by bringing a carefully chosen range of quality products to every doorstep.</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-8">
          <RiEyeLine size={36} className="mb-3 text-red-600" />
          <h2 className="mb-2 text-2xl font-extrabold text-gray-900">Our Vision</h2>
          <p className="leading-7 text-gray-600">To become the most loved shopping destination, where every customer finds what they need and enjoys every step of the experience.</p>
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-14">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Why Choose Us</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {whyChooseUs.map((item) => <InfoCard key={item.title} {...item} />)}
      </div>
    </section>

    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Our Services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((item) => <InfoCard key={item.title} {...item} />)}
        </div>
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-8 text-center">
        <p className="text-sm font-semibold uppercase text-red-600">Our Partners</p>
        <h2 className="text-3xl font-extrabold text-gray-900">Brands You Love</h2>
        <p className="mt-1 text-sm text-gray-500">Explore popular brands (demo list for layout purposes).</p>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {brands.map((brand) => <Brand key={brand.id} name={brand.name} />)}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-14">
      <div className="rounded-2xl bg-red-600 p-10 text-center text-white">
        <h2 className="text-3xl font-extrabold">Shop Smarter, Live Better</h2>
        <p className="mt-2 mb-6">Your next favourite product is just a click away.</p>
        <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-gray-100">
          Explore Products <RiArrowRightLine size={18} />
        </Link>
      </div>
    </section>
  </>
);

export default About;
