import {
  PackageCheck,
  Search,
  Truck,
  Clock3,
  RotateCcw,
  ArrowRight,
  ShoppingBag,
  XCircle,
  Loader,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { products } from "../data/products";

export default function Orders() {
  const orders = products.slice(0, 4).map((product, index) => {
    const statuses = ["Delivered", "In Transit", "Processing", "Cancelled"];

    return {
      ...product,
      status: statuses[index] || "Delivered",
      orderId: `ORD2026${index + 1}`,
      date: index === 0 ? "15 May 2026" : index === 1 ? "20 May 2026" : "25 May 2026",
    };
  });

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <section className="relative overflow-hidden bg-[#111217] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(184,121,58,0.28),transparent_32%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.08),transparent_28%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-xl mb-5">
            <ShoppingBag size={18} className="text-[#f6c27a]" />
            <span className="font-bold text-sm">Order History</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black">My Orders</h1>

          <p className="mt-4 max-w-2xl text-white/60 text-lg">
            Track your purchases, delivery status, returns and previous orders
            in one premium dashboard.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-5 mb-10">
          <StatCard
            icon={<PackageCheck />}
            value="24"
            label="Delivered Orders"
          />

          <StatCard
            icon={<Truck />}
            value="2"
            label="In Transit"
          />

          <StatCard
            icon={<Clock3 />}
            value="₹45K"
            label="Total Spending"
          />
        </div>

        <div className="mb-8 rounded-[2rem] border border-[#ece7df] bg-white p-5 shadow-lg">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search by order ID or product name..."
              className="w-full rounded-2xl border border-[#ece7df] bg-[#f8f5f1] py-4 pl-12 pr-4 outline-none focus:border-[#b8793a]"
            />
          </div>
        </div>

        <div className="space-y-6">
          {orders.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-[2rem] border border-[#ece7df] bg-white p-6 shadow-lg transition hover:shadow-2xl"
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:items-center lg:justify-between">
                <div className="flex flex-col sm:flex-row gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-36 w-full sm:w-36 rounded-[1.5rem] object-cover bg-[#f8f5f1]"
                  />

                  <div>
                    <StatusBadge status={item.status} />

                    <h2 className="mt-4 text-2xl font-black text-[#171717]">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-gray-500">
                      Order ID:{" "}
                      <span className="font-bold text-[#171717]">
                        {item.orderId}
                      </span>
                    </p>

                    <p className="mt-3 text-3xl font-black text-[#171717]">
                      ₹{item.price}
                    </p>
                  </div>
                </div>

                <div className="lg:w-[390px]">
                  <p className="mb-4 font-black text-[#171717]">
                    Delivery Timeline
                  </p>

                  <OrderTimeline status={item.status} />

                  <p className="mt-4 text-sm text-gray-500">
                    {getStatusMessage(item.status, item.date)}
                  </p>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3">
                    <button className="flex-1 rounded-2xl bg-[#171717] py-3 font-black text-white transition hover:bg-[#b8793a] flex items-center justify-center gap-2">
                      Track Order
                      <ArrowRight size={18} />
                    </button>

                    <button className="flex-1 rounded-2xl border border-[#ece7df] py-3 font-black text-[#171717] transition hover:bg-[#f8f5f1] flex items-center justify-center gap-2">
                      <RotateCcw size={18} />
                      Reorder
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-[2rem] border border-[#ece7df] bg-white p-6 shadow-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#f8f5f1] text-[#b8793a]">
        {icon}
      </div>

      <h2 className="text-4xl font-black text-[#171717]">{value}</h2>
      <p className="mt-2 text-gray-500">{label}</p>
    </motion.div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Delivered: "bg-green-50 text-green-700",
    "In Transit": "bg-blue-50 text-blue-700",
    Processing: "bg-orange-50 text-orange-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  const icons = {
    Delivered: <CheckCircle2 size={16} />,
    "In Transit": <Truck size={16} />,
    Processing: <Loader size={16} />,
    Cancelled: <XCircle size={16} />,
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-black ${
        styles[status] || styles.Delivered
      }`}
    >
      {icons[status] || icons.Delivered}
      {status}
    </div>
  );
}

function OrderTimeline({ status }) {
  const steps = ["Placed", "Packed", "Shipped", "Delivered"];

  const activeSteps =
    status === "Delivered"
      ? 4
      : status === "In Transit"
      ? 3
      : status === "Processing"
      ? 2
      : 1;

  return (
    <div className="flex items-center">
      {steps.map((step, index) => {
        const isActive = index < activeSteps;
        const isLast = index === steps.length - 1;

        return (
          <div key={step} className="flex flex-1 items-center">
            <div>
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-black ${
                  isActive
                    ? "bg-[#b8793a] text-white"
                    : "bg-[#f1e7dc] text-gray-400"
                }`}
              >
                {index + 1}
              </div>

              <p className="mt-2 text-xs font-bold text-gray-500">
                {step}
              </p>
            </div>

            {!isLast && (
              <div
                className={`mx-2 h-1 flex-1 rounded-full ${
                  index < activeSteps - 1
                    ? "bg-[#b8793a]"
                    : "bg-[#f1e7dc]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function getStatusMessage(status, date) {
  if (status === "Delivered") {
    return `Delivered successfully on ${date}.`;
  }

  if (status === "In Transit") {
    return "Your order is on the way and will arrive soon.";
  }

  if (status === "Processing") {
    return "Your order is being packed and prepared for shipping.";
  }

  if (status === "Cancelled") {
    return "This order was cancelled. You can reorder anytime.";
  }

  return "Order status is being updated.";
}