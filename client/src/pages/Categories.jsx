import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Categories() {
  const categories = [
    "Men",
    "Women",
    "Kids",
    "Shoes",
    "Watches",
    "Bags",
    "Electronics",
    "Smartphones",
    "Laptops",
    "Gaming",
    "Beauty",
    "Home Decor",
    "Furniture",
    "Sports",
    "Fitness",
    "Accessories",
  ];

  return (
    <section className="min-h-screen bg-[#f8f5f1] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="uppercase tracking-[0.3em] text-[#b8793a] font-bold text-sm mb-4">
            All Collections
          </p>

          <h1 className="text-4xl md:text-6xl font-black text-[#171717]">
            Explore All Categories
          </h1>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
            >
              <Link
                to={`/products?category=${category}`}
                className="block rounded-3xl bg-white p-8 text-center shadow-lg border border-white hover:-translate-y-2 hover:shadow-2xl transition"
              >
                <h2 className="text-xl font-black text-[#171717]">
                  {category}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  View Products
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}