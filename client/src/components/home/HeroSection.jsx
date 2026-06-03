import {
  ArrowRight,
  Headphones,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  User,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const heroImage =
    "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="relative overflow-hidden bg-[#f6efe7]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.95),transparent_34%),radial-gradient(circle_at_82%_28%,rgba(210,160,100,0.34),transparent_36%)]"
      />

      <motion.div
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#d6a36c]/25 blur-3xl"
      />

      <motion.div
        animate={{ y: [0, 16, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-10 h-48 w-48 rounded-full bg-white/70 blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[680px] py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="z-10 max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="text-sm tracking-[0.28em] font-bold text-[#b8793a] uppercase mb-5"
            >
              New Season, New Style
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.25 }}
              className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tight text-[#171717] mb-6"
            >
              Discover Style That Speaks You
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.4 }}
              className="text-lg text-gray-600 leading-relaxed mb-9"
            >
              Explore the latest collections curated for every moment of your
              life with premium products, secure checkout and fast delivery.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.55 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group bg-black text-white px-9 py-4 rounded-lg font-bold hover:bg-[#b8793a] transition flex items-center justify-center gap-2 shadow-xl"
              >
                Shop Now
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="border border-black/40 text-black px-9 py-4 rounded-lg font-bold hover:bg-black hover:text-white transition"
              >
                Explore Collections
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5"
            >
              <MiniFeature
                icon={<Truck size={24} />}
                title="Free Shipping"
                text="On orders over ₹500"
              />

              <MiniFeature
                icon={<ShieldCheck size={24} />}
                title="Secure Payment"
                text="100% secure checkout"
              />

              <MiniFeature
                icon={<Headphones size={24} />}
                title="24/7 Support"
                text="We are here to help"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, x: 60 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="relative h-[560px] hidden lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-[96%] overflow-hidden rounded-l-[100px] shadow-2xl"
            >
              <img
                src={heroImage}
                alt="Premium fashion collection"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-[#f6efe7]/45 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="absolute bottom-12 left-8 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-white px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center">
                  <ShoppingBag size={20} />
                </div>
                <div>
                  <p className="font-black text-black">Premium Collection</p>
                  <p className="text-sm text-gray-500">New arrivals live now</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 1.05 }}
              className="absolute top-12 right-8 rounded-2xl bg-white/80 backdrop-blur-xl shadow-xl border border-white px-5 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#f1ddc9] text-black flex items-center justify-center">
                  <Heart size={20} />
                </div>
                <div>
                  <p className="font-black text-black">Loved by Users</p>
                  <p className="text-sm text-gray-500">4.9 customer rating</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MiniFeature({ icon, title, text }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex items-center gap-3 rounded-2xl bg-white/45 p-4 backdrop-blur-sm border border-white/60"
    >
      <div className="text-black">{icon}</div>

      <div>
        <h4 className="text-sm font-black text-black">{title}</h4>
        <p className="text-xs text-gray-500">{text}</p>
      </div>
    </motion.div>
  );
}