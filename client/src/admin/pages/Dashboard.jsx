import { Package, ShoppingBag, Users, IndianRupee } from "lucide-react";

export default function Dashboard() {
  const stats = [
    { title: "Total Revenue", value: "₹2,45,000", icon: IndianRupee },
    { title: "Total Orders", value: "1,240", icon: ShoppingBag },
    { title: "Total Products", value: "320", icon: Package },
    { title: "Total Users", value: "5,890", icon: Users },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center mb-5">
                <Icon className="text-blue-700" />
              </div>

              <p className="text-gray-500 text-sm">{item.title}</p>
              <h2 className="text-2xl font-bold text-gray-900 mt-2">
                {item.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-6">
        <div className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">Sales Analytics</h2>

          <div className="h-72 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
            Revenue Chart UI
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-3xl p-6">
          <h2 className="text-xl font-bold mb-6">Recent Orders</h2>

          <div className="space-y-4">
            {["ORD202601", "ORD202602", "ORD202603"].map((order) => (
              <div
                key={order}
                className="flex items-center justify-between border-b pb-3"
              >
                <div>
                  <p className="font-semibold">{order}</p>
                  <p className="text-sm text-gray-500">Delivered</p>
                </div>

                <p className="font-bold text-blue-700">₹2,499</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}