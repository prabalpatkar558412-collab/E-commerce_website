import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShieldCheck,
  Truck,
  Tag,
  ArrowRight,
  Lock,
  PackageCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  getCart,
  updateCartItem,
  removeCartItem,
} from "../services/cartService";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const cartItems = cart?.items || [];

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const shipping = subtotal > 0 ? 99 : 0;
  const discount = subtotal > 3000 ? 200 : 0;
  const total = subtotal + shipping - discount;

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
    } catch (error) {
      setMessage("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    if (quantity < 1) {
      return;
    }

    try {
      const updatedCart = await updateCartItem(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      setMessage("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);
      setCart(updatedCart);
      setMessage("Product removed from cart");
    } catch (error) {
      setMessage("Failed to remove product");
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <section className="relative overflow-hidden bg-[#111217] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,121,58,0.28),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.08),transparent_28%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <p className="uppercase tracking-[0.3em] text-[#f6c27a] text-sm font-bold mb-4">
            Your Basket
          </p>

          <h1 className="text-5xl md:text-6xl font-black">Shopping Cart</h1>

          <p className="mt-4 max-w-2xl text-white/60 text-lg">
            Review your selected products and continue to secure checkout.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {message && (
          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50 p-4 font-semibold text-blue-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="rounded-[2rem] bg-white p-10 text-center font-black text-[#171717] shadow-lg">
            Loading cart...
          </div>
        ) : cartItems.length === 0 ? (
          <div className="rounded-[2rem] bg-white p-10 text-center font-black text-[#171717] shadow-lg">
            Your cart is empty.
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_420px] gap-8">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] border border-[#ece7df] bg-white p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-black text-[#171717]">
                      Free Shipping Progress
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {subtotal >= 5000
                        ? "You unlocked free delivery."
                        : `Add ₹${5000 - subtotal} more to unlock free delivery.`}
                    </p>
                  </div>

                  <span className="text-[#b8793a] font-black">
                    {Math.min(Math.round((subtotal / 5000) * 100), 100)}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-[#f1e7dc]">
                  <div
                    className="h-full rounded-full bg-[#b8793a]"
                    style={{
                      width: `${Math.min((subtotal / 5000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </motion.div>

              {cartItems.map((item, index) => (
                <motion.div
                  key={item.product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  className="rounded-[2rem] border border-[#ece7df] bg-white p-5 shadow-lg transition hover:shadow-2xl"
                >
                  <div className="flex flex-col md:flex-row gap-5">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="h-36 w-full md:w-36 rounded-[1.5rem] object-cover bg-[#f8f5f1]"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-black uppercase tracking-wide text-[#b8793a]">
                        {item.product.category}
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-[#171717]">
                        {item.product.name}
                      </h2>

                      <p className="mt-2 text-sm text-gray-500">
                        {item.product.description}
                      </p>

                      <div className="mt-6 flex items-center gap-3">
                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity - 1
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8f5f1] text-[#171717] transition hover:bg-black hover:text-white"
                        >
                          <Minus size={17} />
                        </button>

                        <span className="min-w-8 text-center text-lg font-black">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            handleUpdateQuantity(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] text-white transition hover:bg-[#b8793a]"
                        >
                          <Plus size={17} />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-end gap-5">
                      <button
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="text-right">
                        <p className="text-sm text-gray-400 line-through">
                          ₹{item.product.price + 1000}
                        </p>

                        <p className="text-3xl font-black text-[#171717]">
                          ₹{item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <aside className="sticky top-28 h-fit">
              <motion.div
                initial={{ opacity: 0, x: 35 }}
                animate={{ opacity: 1, x: 0 }}
                className="overflow-hidden rounded-[2rem] border border-[#ece7df] bg-white shadow-2xl"
              >
                <div className="bg-[#111217] p-6 text-white">
                  <h2 className="text-2xl font-black">Order Summary</h2>
                  <p className="mt-1 text-white/55">Review before checkout</p>
                </div>

                <div className="p-6">
                  <div className="mb-6 flex gap-3">
                    <div className="relative flex-1">
                      <Tag
                        size={18}
                        className="absolute left-4 top-4 text-gray-400"
                      />

                      <input
                        type="text"
                        placeholder="Coupon Code"
                        className="w-full rounded-2xl border border-[#ece7df] bg-[#f8f5f1] py-3 pl-11 pr-4 outline-none"
                      />
                    </div>

                    <button className="rounded-2xl bg-[#b8793a] px-5 font-black text-white transition hover:bg-black">
                      Apply
                    </button>
                  </div>

                  <div className="space-y-4 text-gray-600">
                    <PriceRow label="Subtotal" value={`₹${subtotal}`} />
                    <PriceRow label="Shipping" value={`₹${shipping}`} />
                    <PriceRow
                      label="Discount"
                      value={`-₹${discount}`}
                      color="text-green-600"
                    />

                    <div className="border-t border-[#ece7df] pt-5 flex justify-between text-2xl font-black text-[#171717]">
                      <span>Total</span>
                      <span>₹{total}</span>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Benefit
                      icon={<Lock size={18} />}
                      text="Secure encrypted checkout"
                    />
                    <Benefit
                      icon={<Truck size={18} />}
                      text="Fast delivery across India"
                    />
                    <Benefit
                      icon={<PackageCheck size={18} />}
                      text="Easy replacement support"
                    />
                    <Benefit
                      icon={<ShieldCheck size={18} />}
                      text="100% buyer protection"
                    />
                  </div>

                  <button
                    onClick={handleProceedToCheckout}
                    className="group mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#171717] py-4 font-black text-white shadow-xl transition hover:bg-[#b8793a]"
                  >
                    Proceed To Checkout
                    <ArrowRight
                      size={20}
                      className="transition group-hover:translate-x-1"
                    />
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    By placing your order you agree to our Terms & Conditions.
                  </p>
                </div>
              </motion.div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

function PriceRow({ label, value, color = "text-[#171717]" }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={`font-black ${color}`}>{value}</span>
    </div>
  );
}

function Benefit({ icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#f8f5f1] p-4 text-sm font-bold text-[#171717]">
      <span className="text-[#b8793a]">{icon}</span>
      {text}
    </div>
  );
}