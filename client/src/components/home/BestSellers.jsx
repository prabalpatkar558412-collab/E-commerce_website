import { ArrowRight, Crown, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { products } from "../../data/products";

export default function BestSellers() {
  return (
    <section className="relative overflow-hidden bg-[#f6efe7] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(255,255,255,0.9),transparent_30%),radial-gradient(circle_at_90%_25%,rgba(184,121,58,0.12),transparent_28%)]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
          className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8"
        >
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[#b8793a] font-black shadow-sm">
              <Crown size={18} />
              Customer Favorites
            </div>

            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#171717]">
              Best Sellers
            </h2>

            <p className="mt-4 max-w-2xl text-lg text-gray-500">
              Handpicked products loved by shoppers for quality, comfort and
              modern style.
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-black px-7 py-4 font-black text-white transition hover:bg-[#b8793a]"
          >
            View All
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
          className="mb-12 grid lg:grid-cols-[1.2fr_0.8fr] gap-8"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] bg-black min-h-[430px] shadow-2xl">
            <img
              src={products[0]?.image}
              alt="Best seller collection"
              className="absolute inset-0 h-full w-full object-cover opacity-75"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />

            <div className="relative z-10 max-w-lg p-8 md:p-12 text-white">
              <div className="mb-5 flex items-center gap-1 text-[#f6c27a]">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star key={item} size={18} fill="currentColor" />
                ))}
              </div>

              <h3 className="text-4xl md:text-5xl font-black leading-tight">
                Most Loved Collection
              </h3>

              <p className="mt-4 text-white/75 leading-relaxed">
                Explore premium products that customers keep coming back for.
              </p>

              <Link
                to="/products"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-black text-black transition hover:bg-[#b8793a] hover:text-white"
              >
                Shop Best Sellers
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-xl border border-[#ece7df]">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b8793a]">
              Why Customers Love Us
            </p>

            <h3 className="mt-4 text-3xl font-black text-[#171717]">
              Quality products, fast delivery and secure shopping.
            </h3>

            <div className="mt-8 space-y-5">
              <Info title="4.9/5 Rating" text="Trusted by thousands of happy shoppers." />
              <Info title="Easy Returns" text="Simple replacement and return experience." />
              <Info title="Premium Support" text="Quick support whenever customers need help." />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 4).map((product, index) => (
            <motion.div
              key={`best-${product.id}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.45,
                delay: index * 0.08,
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Info({ title, text }) {
  return (
    <div className="rounded-2xl bg-[#f8f5f1] p-5">
      <h4 className="font-black text-[#171717]">{title}</h4>
      <p className="mt-1 text-sm text-gray-500">{text}</p>
    </div>
  );
}