import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import Brand1 from "../../assets/Brand/Brand_1.jpeg";
import Brand2 from "../../assets/Brand/Brand_2.jpeg";
import Brand3 from "../../assets/Brand/Brand_3.jpeg";
import Brand4 from "../../assets/Brand/Brand_4.jpeg";
import Brand6 from "../../assets/Brand/Brand_6.jpeg";
import Brand7 from "../../assets/Brand/Brand_7.jpeg";
import Brand8 from "../../assets/Brand/Brand_8.jpeg";

export default function BrandShowcase() {
  const brands = [Brand1, Brand2, Brand3, Brand4, Brand6, Brand7, Brand8];
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="relative overflow-hidden bg-[#f8f5f1] py-24">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="uppercase tracking-[0.3em] text-[#b8793a] font-bold text-sm mb-4">
            Trusted Worldwide
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-[#171717]">
            Featured Brands
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
            Shop premium products from the world's most trusted brands.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 z-20 h-full w-32 bg-gradient-to-r from-[#f8f5f1] to-transparent" />
        <div className="absolute right-0 top-0 z-20 h-full w-32 bg-gradient-to-l from-[#f8f5f1] to-transparent" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 w-max"
        >
          {marqueeBrands.map((brand, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.03 }}
              className="flex h-32 min-w-[260px] items-center justify-center rounded-[2rem] bg-white border border-[#ece7df] shadow-lg px-8"
            >
              <img
                src={brand}
                alt="Brand Logo"
                className="max-h-20 w-auto object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <StatsSection />
    </section>
  );
}

function StatsSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 mt-14">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <CounterCard end={500} suffix="+" label="Brand Partners" />
        <CounterCard end={50} suffix="K+" label="Happy Customers" />
        <CounterCard end={1} suffix="M+" label="Products Sold" />
        <CounterCard end={4.9} suffix="★" label="Customer Rating" decimal />
      </div>
    </div>
  );
}

function CounterCard({ end, suffix, label, decimal = false }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1400;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45 }}
      className="rounded-[2rem] bg-white p-8 text-center shadow-lg border border-[#ece7df]"
    >
      <h3 className="text-4xl font-black text-[#171717]">
        {decimal ? count.toFixed(1) : Math.floor(count)}
        {suffix}
      </h3>

      <p className="text-gray-500 mt-3 font-medium">{label}</p>
    </motion.div>
  );
}