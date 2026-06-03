import { ArrowRight, Clock3, Flame, ShieldCheck, Truck } from "lucide-react";
import { motion } from "framer-motion";

export default function FlashSaleSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-orange-50 to-white" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-orange-500 via-orange-500 to-red-500 text-white p-8 md:p-12 shadow-2xl shadow-orange-500/25"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl" />

          <div className="relative grid lg:grid-cols-[1fr_360px] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/20 backdrop-blur-xl px-4 py-2 rounded-full font-black mb-5">
                <Flame size={18} />
                Flash Sale Live
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                Up To 50% Off Today
              </h2>

              <p className="text-orange-50 mt-4 text-lg max-w-2xl">
                Limited-time offers on selected premium products. Grab your
                favorites before the deal expires.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-2xl">
                {[
                  { label: "Days", value: "02" },
                  { label: "Hours", value: "18" },
                  { label: "Mins", value: "45" },
                  { label: "Secs", value: "20" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/20 border border-white/20 rounded-2xl p-4 text-center backdrop-blur-xl"
                  >
                    <h3 className="text-3xl font-black">{item.value}</h3>
                    <p className="text-orange-100 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button className="group bg-white text-orange-600 hover:bg-gray-100 px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition">
                  Grab Deal
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>

                <button className="bg-white/15 hover:bg-white/25 border border-white/20 px-8 py-4 rounded-2xl font-black backdrop-blur-xl transition">
                  View Offers
                </button>
              </div>
            </div>

            <div className="bg-white/15 border border-white/20 rounded-[2rem] p-6 backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-white text-orange-500 flex items-center justify-center">
                  <Clock3 size={28} />
                </div>

                <div>
                  <h3 className="text-2xl font-black">Limited Time</h3>
                  <p className="text-orange-100">Sale ending soon</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/15 rounded-2xl p-4">
                  <Truck size={20} />
                  <span className="font-bold">Fast Delivery Included</span>
                </div>

                <div className="flex items-center gap-3 bg-white/15 rounded-2xl p-4">
                  <ShieldCheck size={20} />
                  <span className="font-bold">Secure Payment</span>
                </div>

                <div className="bg-white rounded-2xl p-5 text-gray-900">
                  <p className="text-sm text-gray-500">Use Coupon Code</p>
                  <h3 className="text-3xl font-black text-orange-500">
                    SALE50
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}