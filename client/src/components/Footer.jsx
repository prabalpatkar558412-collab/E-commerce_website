import {
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Orders", path: "/orders" },
    { name: "Wishlist", path: "/wishlist" },
  ];

  const supportLinks = [
    "Help Center",
    "Returns",
    "Shipping",
    "Contact Us",
  ];

  const socialLinks = [
    { icon: "F", href: "#" },
    { icon: "I", href: "#" },
    { icon: "X", href: "#" },
    { icon: "Y", href: "#" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#111217] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(184,121,58,0.2),transparent_30%),radial-gradient(circle_at_90%_80%,rgba(255,255,255,0.08),transparent_30%)]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#b8793a] flex items-center justify-center shadow-lg">
                <ShoppingBag size={22} />
              </div>

              <div>
                <h2 className="text-2xl font-black">
                  Shop<span className="text-[#b8793a]">Sphere</span>
                </h2>

                <p className="text-xs text-white/45">
                  Premium Store
                </p>
              </div>
            </Link>

            <p className="text-white/55 leading-relaxed mb-6">
              Premium shopping experience with secure payments,
              fast delivery, easy returns and trusted products
              for modern shoppers.
            </p>

            <div className="flex items-center gap-3">
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  whileHover={{
                    y: -4,
                    scale: 1.08,
                  }}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#b8793a] flex items-center justify-center transition font-bold"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-white/55">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#f6c27a] transition flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={15}
                      className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-black text-lg mb-5">
              Customer Support
            </h3>

            <ul className="space-y-3 text-white/55">
              {supportLinks.map((item) => (
                <li
                  key={item}
                  className="hover:text-[#f6c27a] transition cursor-pointer flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={15}
                    className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-7 space-y-3 text-white/55 text-sm">
              <p className="flex items-center gap-3">
                <Mail size={17} className="text-[#f6c27a]" />
                support@shopsphere.com
              </p>

              <p className="flex items-center gap-3">
                <Phone size={17} className="text-[#f6c27a]" />
                +91 98765 43210
              </p>

              <p className="flex items-center gap-3">
                <MapPin size={17} className="text-[#f6c27a]" />
                India
              </p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-black text-lg mb-5">
              Get Premium Offers
            </h3>

            <p className="text-white/55 mb-5">
              Subscribe to get latest deals, new arrivals
              and exclusive offers.
            </p>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-2xl bg-white px-4 py-3 text-gray-900 outline-none"
              />

              <button className="mt-3 w-full rounded-2xl bg-[#b8793a] py-3 font-black transition hover:bg-white hover:text-black">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-white/35 mt-4">
              No spam. Only premium shopping updates.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/45 text-sm">
          <p>
            © 2026 ShopSphere. All Rights Reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="hover:text-[#f6c27a] cursor-pointer transition">
              Privacy Policy
            </span>

            <span className="hover:text-[#f6c27a] cursor-pointer transition">
              Terms
            </span>

            <span className="hover:text-[#f6c27a] cursor-pointer transition">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
