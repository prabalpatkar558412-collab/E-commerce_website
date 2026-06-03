import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CategoriesSection() {
  const categories = [
    {
      name: "Men",
      count: "240+ Products",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900",
    },
    {
      name: "Women",
      count: "320+ Products",
      image:
        "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=900",
    },
    {
      name: "Kids",
      count: "180+ Products",
      image:
        "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=900",
    },
    {
      name: "Shoes",
      count: "210+ Products",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900",
    },
    {
      name: "Watches",
      count: "95+ Products",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=900",
    },
    {
      name: "Bags",
      count: "110+ Products",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=900",
    },
    {
      name: "Electronics",
      count: "430+ Products",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",
    },
    {
      name: "Smartphones",
      count: "160+ Products",
      image:
        "https://images.unsplash.com/photo-1512499617640-c2f999098c01?w=900",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#f8f5f1] py-24">
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#d6a15d]/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#b8793a]/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="uppercase tracking-[0.35em] text-[#b8793a] font-bold text-sm mb-4">
            Curated Collections
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-[#171717]">
            Shop By Category
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto text-base md:text-lg">
            Discover premium products carefully selected for every lifestyle.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.07,
              },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.name}
              variants={{
                hidden: { opacity: 0, y: 45, scale: 0.96 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Link to="/products" className="block">
                <motion.div
                  whileHover={{
                    y: -12,
                    rotateX: 4,
                    rotateY: 4,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 18,
                  }}
                  className="group relative overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white/70"
                >
                  <div className="relative h-64 overflow-hidden">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.8 }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />

                    <div className="absolute top-4 right-4 rounded-full bg-white/90 px-4 py-2 text-xs font-bold text-[#171717] shadow-lg">
                      {category.count}
                    </div>

                    <div className="absolute bottom-5 left-5 right-5">
                      <h3 className="text-2xl font-black text-white">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-sm text-white/80">
                        Explore Collection
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-5 py-4">
                    <span className="text-sm font-bold text-[#171717]">
                      Premium Picks
                    </span>

                    <span className="rounded-full bg-[#171717] px-4 py-2 text-xs font-bold text-white transition group-hover:bg-[#b8793a]">
                      Shop Now
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 flex justify-center"
        >
          <Link
            to="/categories"
            className="rounded-full bg-[#171717] px-9 py-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-xl transition hover:bg-[#b8793a]"
          >
            View More Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}