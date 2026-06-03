import { ArrowRight, Flame, Sparkles, Timer } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function TrendingProducts() {
  return (
    <section className="relative overflow-hidden bg-[#f8f5f1] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(255,255,255,0.9),transparent_28%),radial-gradient(circle_at_90%_15%,rgba(184,121,58,0.14),transparent_30%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#efe1d3] px-4 py-2 text-[#b8793a] font-black mb-5">
              <Flame size={18} />
              Limited Release
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#171717]">
              Trending Products
            </h2>

            <p className="text-gray-500 mt-4 max-w-2xl text-lg">
              Premium picks selected for modern shoppers who love quality,
              style and comfort.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-7 py-4 font-black text-black shadow-lg transition hover:bg-black hover:text-white"
          >
            View All Products
            <ArrowRight
              size={19}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mb-12 overflow-hidden rounded-[2rem] bg-[#171717] p-8 md:p-10 text-white shadow-2xl"
        >
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#b8793a]/30 blur-3xl" />
          <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl">
                <Sparkles size={18} className="text-[#f6c27a]" />
                <span className="font-bold text-sm">Luxury Deal Drop</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black">
                Up To 50% Off Selected Products
              </h3>

              <p className="mt-3 max-w-xl text-white/70">
                Upgrade your collection with premium fashion, accessories and
                tech essentials at special prices.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-xl">
                <Timer size={22} className="text-[#f6c27a]" />
                <div>
                  <p className="text-xs text-white/60">Ends In</p>
                  <p className="font-black">24 Hours</p>
                </div>
              </div>

              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-2xl bg-[#b8793a] px-8 py-4 font-black text-white transition hover:bg-white hover:text-black"
              >
                Shop Deals
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
              whileHover={{ y: -8 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-black px-10 py-5 font-black text-white transition hover:bg-[#b8793a]"
          >
            Explore Full Collection
            <ArrowRight
              size={20}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}