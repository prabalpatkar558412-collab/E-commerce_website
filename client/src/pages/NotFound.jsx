import { ArrowLeft, Home, Search, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-blue-700 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.25),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.35),transparent_35%)]" />

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl text-center"
      >
        <div className="mx-auto mb-8 w-24 h-24 rounded-[2rem] bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl">
          <ShoppingBag size={44} className="text-orange-300" />
        </div>

        <h1 className="text-[8rem] md:text-[12rem] leading-none font-black text-white drop-shadow-2xl">
          404
        </h1>

        <h2 className="text-3xl md:text-5xl font-black text-white mt-4">
          Page Not Found
        </h2>

        <p className="text-blue-100 mt-4 mb-8 max-w-xl mx-auto text-lg">
          The page you are looking for may have been moved, deleted, or never
          existed.
        </p>

        <div className="bg-white/10 border border-white/20 backdrop-blur-xl rounded-[2rem] p-4 md:p-5 flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search products instead..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl outline-none text-gray-900"
            />
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded-2xl font-black transition">
            Search
          </button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-orange-500/25 transition"
          >
            <Home size={20} />
            Back To Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-4 rounded-2xl font-black backdrop-blur-xl transition"
          >
            <ArrowLeft size={20} />
            Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}