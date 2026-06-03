import {
  Star,
  Quote,
  ShieldCheck,
  Users,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Aman Sharma",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?img=11",
      review:
        "Amazing shopping experience. Delivery was super fast and the product quality was excellent.",
    },
    {
      name: "Riya Verma",
      role: "Premium Customer",
      image: "https://i.pravatar.cc/150?img=32",
      review:
        "The quality exceeded my expectations. The checkout experience was smooth and secure.",
    },
    {
      name: "Rahul Singh",
      role: "Verified Buyer",
      image: "https://i.pravatar.cc/150?img=15",
      review:
        "Best prices, fast delivery and excellent customer support. Highly recommended.",
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold mb-5">
            <Award size={18} />
            Customer Reviews
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900">
            Loved By Thousands
          </h2>

          <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
            Trusted by customers across India for premium products,
            secure payments and lightning-fast delivery.
          </p>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center shadow-sm">
            <h3 className="text-4xl font-black text-blue-700">
              50K+
            </h3>
            <p className="text-gray-500 mt-2">
              Happy Customers
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center shadow-sm">
            <h3 className="text-4xl font-black text-orange-500">
              4.9★
            </h3>
            <p className="text-gray-500 mt-2">
              Average Rating
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-3xl p-6 text-center shadow-sm">
            <h3 className="text-4xl font-black text-green-600">
              98%
            </h3>
            <p className="text-gray-500 mt-2">
              Satisfaction Rate
            </p>
          </div>
        </div>

        {/* Testimonials */}

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="group bg-white border border-gray-200 rounded-[2rem] p-7 shadow-sm hover:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-50" />

              <Quote
                size={40}
                className="text-blue-100 mb-5"
              />

              <div className="flex items-center gap-1 text-yellow-400 mb-5">
                {[1, 2, 3, 4, 5].map((item) => (
                  <Star
                    key={item}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed mb-6">
                "{review.review}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-black text-gray-900">
                    {review.name}
                  </h3>

                  <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                    <ShieldCheck size={14} />
                    {review.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Banner */}

        <div className="mt-16 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white rounded-[2rem] p-8 md:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-3xl font-black">
                Join 50,000+ Happy Customers
              </h3>

              <p className="text-blue-100 mt-3">
                Experience premium shopping with secure checkout,
                fast delivery and trusted brands.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white/15 px-5 py-4 rounded-2xl backdrop-blur-xl">
              <Users size={22} />
              <span className="font-black">
                Trusted Across India
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}