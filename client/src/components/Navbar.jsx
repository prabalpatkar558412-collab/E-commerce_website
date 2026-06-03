import {
  Heart,
  Menu,
  Search,
  ShoppingBag,
  User,
  X,
  ChevronDown,
  Package,
  Shirt,
  Watch,
  Laptop,
  LayoutDashboard,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { getCart } from "../services/cartService";
import { getWishlist } from "../services/wishlistService";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const isAdmin = userInfo?.role === "admin";
  const isLoggedIn = !!userInfo?.token;

  const categories = [
    { name: "Fashion", icon: <Shirt size={18} /> },
    { name: "Electronics", icon: <Laptop size={18} /> },
    { name: "Accessories", icon: <Watch size={18} /> },
    { name: "Shoes", icon: <Package size={18} /> },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative font-bold transition ${
      isActive ? "text-[#b8793a]" : "text-gray-700 hover:text-[#b8793a]"
    }`;

  useEffect(() => {
    const fetchCounts = async () => {
      if (!isLoggedIn) {
        setCartCount(0);
        setWishlistCount(0);
        return;
      }

      try {
        const cartData = await getCart();
        const wishlistData = await getWishlist();

        const totalCartItems = cartData?.items?.length || 0;
        const totalWishlistItems = wishlistData?.products?.length || 0;

        setCartCount(totalCartItems);
        setWishlistCount(totalWishlistItems);
      } catch (error) {
        setCartCount(0);
        setWishlistCount(0);
      }
    };

    fetchCounts();

    window.addEventListener("focus", fetchCounts);

    return () => {
      window.removeEventListener("focus", fetchCounts);
    };
  }, [isLoggedIn]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/85 backdrop-blur-xl shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center gap-6">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-[#171717]"
        >
          Shop<span className="text-[#b8793a]">Sphere</span>
        </Link>

        <div className="relative hidden lg:block">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-2 rounded-full border border-[#ece7df] bg-[#f8f5f1] px-5 py-3 text-sm font-black text-[#171717] transition hover:bg-black hover:text-white"
          >
            Categories
            <ChevronDown
              size={16}
              className={`transition ${categoryOpen ? "rotate-180" : ""}`}
            />
          </button>

          {categoryOpen && (
            <div className="absolute left-0 top-14 w-72 rounded-3xl border border-[#ece7df] bg-white p-3 shadow-2xl">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to="/products"
                  onClick={() => setCategoryOpen(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 font-bold text-gray-700 transition hover:bg-[#f8f5f1] hover:text-[#b8793a]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f5f1] text-[#171717]">
                    {category.icon}
                  </span>
                  {category.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="hidden md:flex flex-1 items-center rounded-full border border-[#ece7df] bg-[#f8f5f1] px-5 py-3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products, brands and categories..."
            className="w-full bg-transparent px-3 text-sm outline-none"
          />
        </div>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkClass}>
            Shop
          </NavLink>

          <NavLink to="/orders" className={navLinkClass}>
            Orders
          </NavLink>

          {isAdmin && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-4 py-2 font-black transition ${
                  isActive
                    ? "bg-[#b8793a] text-white"
                    : "bg-[#111217] text-white hover:bg-[#b8793a]"
                }`
              }
            >
              <LayoutDashboard size={17} />
              Admin Panel
            </NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <IconLink to="/wishlist" count={wishlistCount}>
            <Heart size={21} />
          </IconLink>

          <IconLink to="/cart" count={cartCount}>
            <ShoppingBag size={21} />
          </IconLink>

          <Link
            to={isLoggedIn ? "/profile" : "/login"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] text-white transition hover:bg-[#b8793a]"
          >
            <User size={20} />
          </Link>
        </div>

        <button
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f5f1] text-[#171717] md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#ece7df] bg-white px-6 py-5">
          <div className="mb-5 flex items-center rounded-full border border-[#ece7df] bg-[#f8f5f1] px-4 py-3">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-transparent px-3 text-sm outline-none"
            />
          </div>

          <div className="space-y-3">
            <MobileLink to="/" setMobileOpen={setMobileOpen}>
              Home
            </MobileLink>

            <MobileLink to="/products" setMobileOpen={setMobileOpen}>
              Shop
            </MobileLink>

            <MobileLink to="/wishlist" setMobileOpen={setMobileOpen}>
              Wishlist ({wishlistCount})
            </MobileLink>

            <MobileLink to="/cart" setMobileOpen={setMobileOpen}>
              Cart ({cartCount})
            </MobileLink>

            <MobileLink to="/orders" setMobileOpen={setMobileOpen}>
              Orders
            </MobileLink>

            <MobileLink
              to={isLoggedIn ? "/profile" : "/login"}
              setMobileOpen={setMobileOpen}
            >
              {isLoggedIn ? "Profile" : "Login"}
            </MobileLink>

            {isAdmin && (
              <MobileLink to="/admin" setMobileOpen={setMobileOpen}>
                Admin Panel
              </MobileLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function IconLink({ to, count, children }) {
  return (
    <Link
      to={to}
      className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#f8f5f1] text-[#171717] transition hover:bg-black hover:text-white"
    >
      {children}

      {count > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#b8793a] text-[11px] font-black text-white">
          {count}
        </span>
      )}
    </Link>
  );
}

function MobileLink({ to, setMobileOpen, children }) {
  return (
    <Link
      to={to}
      onClick={() => setMobileOpen(false)}
      className="block rounded-2xl px-4 py-3 font-black text-[#171717] transition hover:bg-[#f8f5f1] hover:text-[#b8793a]"
    >
      {children}
    </Link>
  );
}