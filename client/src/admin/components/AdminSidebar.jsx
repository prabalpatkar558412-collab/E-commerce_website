import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Tags,
  ShoppingBag,
  Users,
  TicketPercent,
  Settings,
} from "lucide-react";

export default function AdminSidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Add Product", path: "/admin/add-product", icon: PlusCircle },
    { name: "Categories", path: "/admin/categories", icon: Tags },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Coupons", path: "/admin/coupons", icon: TicketPercent },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="w-72 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-10">ShopSphere Admin</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}