import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  RefreshCcw,
  Headphones,
  BadgeCheck,
  CreditCard,
} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      icon: Truck,
      title: "Fast Delivery",
      desc: "Quick and reliable delivery for every order.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Payment",
      desc: "Your transactions are protected with trusted security.",
    },
    {
      icon: RefreshCcw,
      title: "Easy Returns",
      desc: "Simple return and replacement process.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      desc: "Our support team is always ready to help you.",
    },
    {
      icon: BadgeCheck,
      title: "Premium Quality",
      desc: "Only selected products from trusted brands.",
    },
    {
      icon: CreditCard,
      title: "Flexible Payment",
      desc: "Multiple payment options for easy checkout.",
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-blue-50/40 to-white overflow-hidden">
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-orange-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-200/60 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <p className="text-orange-500 font-black uppercase tracking-[0.25em] mb-4">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
            Premium Features For Better Shopping
          </h2>

          <p className="text-gray-500 text-lg mt-5 leading-relaxed">
            Enjoy a smooth, safe, and premium shopping experience with services
            designed for modern customers.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                className="group relative bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-xl shadow-blue-100/70 hover:shadow-2xl hover:shadow-orange-100 transition-all overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 opacity-0 group-hover:opacity-100 transition duration-500" />

                <div className="absolute -right-10 -top-10 w-32 h-32 bg-blue-100 rounded-full group-hover:bg-orange-100 transition" />

                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-700/30 group-hover:from-orange-500 group-hover:to-orange-400 group-hover:shadow-orange-500/30 transition-all">
                    <Icon size={30} />
                  </div>

                  <h3 className="text-2xl font-black text-gray-900 mt-7">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 leading-relaxed mt-3">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}