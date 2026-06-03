import {
  SlidersHorizontal,
  Search,
  Star,
  Truck,
  ShieldCheck,
  X,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["Electronics", "Fashion", "Shoes", "Accessories"];
  const priceRanges = ["Under ₹1000", "₹1000 - ₹3000", "₹3000 - ₹5000"];
  const brands = ["Apple", "Nike", "Sony", "Samsung"];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setError("");
      } catch (err) {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <section className="relative overflow-hidden bg-[#111217] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,121,58,0.3),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.08),transparent_28%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl mb-5">
                <Star size={17} fill="currentColor" className="text-[#f6c27a]" />
                <span className="font-bold text-sm">Premium Collection</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black">
                All Products
              </h1>

              <p className="mt-4 max-w-2xl text-white/60 text-lg">
                Browse premium products, trending deals and best sellers from
                trusted brands.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <p className="text-white/60 text-sm">Available Products</p>
              <h2 className="text-4xl font-black">{products.length}+</h2>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8 rounded-[2rem] border border-[#ece7df] bg-white p-5 shadow-lg flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-xl">
            <Search size={19} className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="w-full rounded-2xl border border-[#ece7df] bg-[#f8f5f1] py-4 pl-12 pr-4 outline-none transition focus:border-[#b8793a] focus:bg-white"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="lg:hidden flex items-center justify-center gap-2 rounded-2xl bg-[#f8f5f1] px-5 py-4 font-black">
              <SlidersHorizontal size={18} />
              Filters
            </button>

            <select className="rounded-2xl border border-[#ece7df] bg-[#f8f5f1] px-5 py-4 outline-none focus:border-[#b8793a]">
              <option>Sort by Latest</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Top Rated</option>
            </select>
          </div>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {["Free Delivery", "Top Rated", "Best Deals", "New Arrival"].map(
            (item) => (
              <span
                key={item}
                className="flex items-center gap-2 rounded-full border border-[#ece7df] bg-white px-4 py-2 text-sm font-black text-[#171717] shadow-sm"
              >
                {item}
                <X size={14} className="text-gray-400" />
              </span>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <aside className="hidden lg:block h-fit sticky top-28 rounded-[2rem] border border-[#ece7df] bg-white p-6 shadow-lg">
            <div className="mb-7 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f8f5f1] text-[#b8793a]">
                <SlidersHorizontal size={20} />
              </div>

              <div>
                <h2 className="text-xl font-black text-[#171717]">Filters</h2>
                <p className="text-gray-500 text-sm">Refine your search</p>
              </div>
            </div>

            <FilterSection title="Category" items={categories} />
            <FilterSection title="Price Range" items={priceRanges} />
            <FilterSection title="Brands" items={brands} />

            <div className="mt-6 space-y-4 border-t border-[#ece7df] pt-6">
              <div className="flex items-center gap-3 rounded-2xl bg-[#f8f5f1] p-4 text-sm font-bold text-[#171717]">
                <Truck size={18} className="text-[#b8793a]" />
                Fast delivery available
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-[#f8f5f1] p-4 text-sm font-bold text-[#171717]">
                <ShieldCheck size={18} className="text-[#b8793a]" />
                100% secure checkout
              </div>
            </div>

            <button className="mt-7 w-full rounded-2xl bg-[#171717] py-4 font-black text-white transition hover:bg-[#b8793a]">
              Apply Filters
            </button>
          </aside>

          <section>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-black text-[#171717]">
                  {products.length}
                </span>{" "}
                products
              </p>

              <p className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                <Sparkles size={16} className="text-[#b8793a]" />
                Updated with latest premium deals
              </p>
            </div>

            {loading && (
              <div className="rounded-[2rem] bg-white p-10 text-center font-black text-[#171717] shadow-lg">
                Loading products...
              </div>
            )}

            {error && !loading && (
              <div className="rounded-[2rem] bg-red-50 p-10 text-center font-black text-red-600 shadow-lg">
                {error}
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className="rounded-[2rem] bg-white p-10 text-center font-black text-[#171717] shadow-lg">
                No products found.
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                  >
                    <ProductCard product={{ ...product, id: product._id }} />
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, items }) {
  return (
    <div className="mb-6 border-b border-[#ece7df] pb-6">
      <h3 className="mb-4 font-black text-[#171717]">{title}</h3>

      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item}
            className="flex cursor-pointer items-center gap-3 text-gray-700"
          >
            <input type="checkbox" className="accent-[#b8793a]" />
            <span className="font-medium">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}