import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreditCard, MapPin, ShieldCheck } from "lucide-react";
import { createRazorpayOrder, verifyRazorpayPayment } from "../services/paymentService";

export default function Checkout() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalAmount = 500;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (
      !shippingInfo.fullName ||
      !shippingInfo.phone ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.state ||
      !shippingInfo.pincode
    ) {
      alert("Please fill all shipping details");
      return;
    }

    try {
      setLoading(true);

      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load");
        setLoading(false);
        return;
      }

      const orderData = await createRazorpayOrder(totalAmount);

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "ShopSphere",
        description: "Order Payment",
        order_id: orderData.order.id,

        handler: async function (response) {
          const verifyData = await verifyRazorpayPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyData.success) {
            alert("Payment successful");
            navigate("/orders");
          } else {
            alert("Payment verification failed");
          }
        },

        prefill: {
          name: shippingInfo.fullName,
          contact: shippingInfo.phone,
        },

        theme: {
          color: "#2563eb",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      alert(error.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-blue-600" />
              <h2 className="text-xl font-bold">Shipping Address</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="fullName"
                value={shippingInfo.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="phone"
                value={shippingInfo.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="address"
                value={shippingInfo.address}
                onChange={handleChange}
                placeholder="Full Address"
                className="md:col-span-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="city"
                value={shippingInfo.city}
                onChange={handleChange}
                placeholder="City"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="state"
                value={shippingInfo.state}
                onChange={handleChange}
                placeholder="State"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                name="pincode"
                value={shippingInfo.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <CreditCard size={20} />
              {loading ? "Processing..." : "Pay with Razorpay"}
            </button>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-4">
              <ShieldCheck size={18} />
              <span>Secure payment powered by Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}