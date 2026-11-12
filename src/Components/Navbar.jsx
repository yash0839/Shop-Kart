import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  RiCloseLine,
  RiHeart3Line,
  RiLogoutBoxRLine,
  RiMenu3Line,
  RiShoppingCart2Line,
  RiUser3Line,
} from "@remixicon/react";
import SearchBar from "./SearchBar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const desktopLinkClass = ({ isActive }) =>
  `border-b-2 py-2.5 text-sm font-medium transition-colors ${
    isActive ? "border-red-500 text-white" : "border-transparent text-gray-300 hover:text-white"
  }`;

const mobileLinkClass = ({ isActive }) =>
  `block rounded-lg px-3 py-2.5 text-sm font-medium ${
    isActive ? "bg-red-600 text-white" : "text-gray-200 hover:bg-white/10"
  }`;

function CountBadge({ count }) {
  if (!count) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}

function IconLink({ to, label, count, children }) {
  return (
    <Link
      to={to}
      aria-label={count ? `${label} (${count})` : label}
      className="relative flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10"
    >
      {children}
      <CountBadge count={count} />
    </Link>
  );
}

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, logout } = useAuth();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (query) => {
    closeMenu();
    navigate(query ? `/products?search=${encodeURIComponent(query)}` : "/products");
  };

  const handleLogout = () => {
    logout();
    closeMenu();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* <div className="bg-red-600 py-1.5 text-center text-xs font-medium text-white">
        Free shipping on orders over $50 · Demo store - no real orders or payments
      </div> */}

      <div className="bg-black text-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <Link to="/" onClick={closeMenu} className="shrink-0 text-2xl font-extrabold tracking-tight">
            Shop<span className="text-red-500">-Kart</span>
          </Link>

          <div className="mx-4 hidden flex-1 md:block md:max-w-xl lg:mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="ml-auto flex items-center gap-1">
            <IconLink to="/wishlist" label="Wishlist" count={wishlistCount}>
              <RiHeart3Line size={22} />
            </IconLink>
            <IconLink to="/cart" label="Cart" count={cartCount}>
              <RiShoppingCart2Line size={22} />
            </IconLink>

            <div className="ml-2 hidden items-center gap-2 md:flex">
              {user ? (
                <>
                  <span className="flex items-center gap-1.5 text-sm text-gray-200">
                    <RiUser3Line size={18} /> Hi, {user.name.split(" ")[0]}
                  </span>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 rounded-lg border border-white/30 px-3 py-1.5 text-sm font-medium transition hover:bg-white hover:text-black"
                  >
                    <RiLogoutBoxRLine size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="px-2 text-sm font-medium text-gray-200 transition hover:text-white">Login</Link>
                  <Link to="/register" className="rounded-lg bg-red-600 px-4 py-1.5 text-sm font-semibold transition hover:bg-red-700">Register</Link>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="ml-1 flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-white/10 md:hidden"
            >
              {menuOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
            </button>
          </div>
        </div>

        <div className="px-4 pb-3 md:hidden">
          <SearchBar onSearch={handleSearch} />
        </div>

        <nav className="hidden border-t border-white/10 bg-neutral-900 md:block" aria-label="Main">
          <div className="mx-auto flex max-w-7xl gap-8 px-4">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.end} className={desktopLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {menuOpen && (
          <nav className="border-t border-white/10 bg-neutral-900 px-4 py-3 md:hidden" aria-label="Mobile">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} end={link.end} onClick={closeMenu} className={mobileLinkClass}>
                  {link.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-3 border-t border-white/10 pt-3">
              {user ? (
                <div className="flex items-center justify-between px-3">
                  <span className="flex items-center gap-2 text-sm text-gray-200"><RiUser3Line size={18} /> {user.name}</span>
                  <button type="button" onClick={handleLogout} className="rounded-lg border border-white/30 px-3 py-1.5 text-sm">Logout</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/login" onClick={closeMenu} className="rounded-lg border border-white/30 py-2 text-center text-sm font-medium">Login</Link>
                  <Link to="/register" onClick={closeMenu} className="rounded-lg bg-red-600 py-2 text-center text-sm font-semibold">Register</Link>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
