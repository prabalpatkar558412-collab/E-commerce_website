import {
  CreditCard,
  MapPin,
  ShieldCheck,
  Truck,
  Lock,
  ArrowRight,
  Tag,
  Wallet,
  Banknote,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { products } from "../data/products";

export default function Checkout() {
  const checkoutItems = products.slice(0, 2);

  const subtotal = checkoutItems.reduce((total, item) => total + item.price, 0);
  const shipping = 99;
  const discount = 150;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white p-8 md:p-10 shadow-2xl mb-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 px-4 py-2 rounded-full mb-4">
              <Lock size={18} />
              Secure Checkout
            </div>

            <h1 className="text-4xl md:text-5xl font-black">Checkout</h1>

            <p className="text-blue-100 mt-3 max-w-2xl">
              Complete your order with secure payment and fast delivery.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-8">
          <div className="space-y-6">
            <motion.section
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-[2rem] p-6 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <MapPin />
                </div>

                <div>
                  <h2 className="text-2xl font-black">Shipping Address</h2>
                  <p className="text-gray-500 text-sm">
                    Add your delivery information
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="Full Name"
                />

                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="Phone Number"
                />

                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition md:col-span-2"
                  placeholder="House No, Street, Area"
                />

                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="City"
                />

                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="Pincode"
                />

                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="State"
                />

                <input
                  className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-4 outline-none focus:border-blue-600 focus:bg-white transition"
                  placeholder="Landmark"
                />
              </div>
            </motion.section>

            <motion.section
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 rounded-[2rem] p-6 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center">
                  <CreditCard />
                </div>

                <div>
                  <h2 className="text-2xl font-black">Payment Method</h2>
                  <p className="text-gray-500 text-sm">
                    Choose your preferred payment option
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-4 border border-blue-200 bg-blue-50 rounded-2xl p-5 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
                    defaultChecked
                    className="accent-blue-700"
                  />
                  <Wallet className="text-blue-700" />
                  <div>
                    <h3 className="font-black">Razorpay / UPI / Card</h3>
                    <p className="text-gray-500 text-sm">
                      Pay securely using UPI, cards, wallets or net banking.
                    </p>
                  </div>
                </label>

                <label className="flex items-center gap-4 border border-gray-200 bg-white rounded-2xl p-5 cursor-pointer hover:bg-gray-50 transition">
                  <input
                    type="radio"
                    name="payment"
                    className="accent-blue-700"
                  />
                  <Banknote className="text-orange-500" />
                  <div>
                    <h3 className="font-black">Cash on Delivery</h3>
                    <p className="text-gray-500 text-sm">
                      Pay when your product arrives at your doorstep.
                    </p>
                  </div>
                </label>
              </div>
            </motion.section>
          </div>

          <aside className="sticky top-28 h-fit">
            <div className="bg-white border border-gray-200 rounded-[2rem] shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-slate-950 to-blue-900 text-white p-6">
                <h2 className="text-2xl font-black">Order Summary</h2>
                <p className="text-blue-100 mt-1">Review your final order</p>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {checkoutItems.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-2xl"
                      />

                      <div className="flex-1">
                        <p className="font-black text-gray-900">{item.name}</p>
                        <p className="text-gray-500 text-sm">{item.category}</p>
                        <p className="text-blue-700 font-black mt-1">
                          ₹{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3">
                  <Tag className="text-orange-500" />
                  <div>
                    <h3 className="font-black text-gray-900">
                      Coupon Applied
                    </h3>
                    <p className="text-sm text-gray-500">
                      You saved ₹{discount} on this order.
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100 mt-6 pt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-bold">₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-bold">₹{shipping}</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-bold">-₹{discount}</span>
                  </div>

                  <div className="border-t pt-4 flex justify-between text-2xl font-black">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-green-600" />
                    100% secure encrypted checkout
                  </p>

                  <p className="flex items-center gap-3">
                    <Truck size={18} className="text-blue-600" />
                    Fast delivery across India
                  </p>

                  <p className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-orange-500" />
                    Easy returns on eligible products
                  </p>
                </div>

                <button className="group mt-8 w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition">
                  Place Order
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1 transition"
                  />
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  By placing your order, you agree to our Terms & Conditions.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}