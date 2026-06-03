import {
  User,
  Edit,
  Package,
  Heart,
  ShoppingCart,
  MapPin,
  CreditCard,
  TicketPercent,
  HelpCircle,
  Phone,
  ShieldCheck,
  LogOut,
  ChevronRight,
  X,
  Save,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../services/authService";

export default function Profile() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(localStorage.getItem("userInfo")) || {};

  const [userInfo, setUserInfo] = useState(savedUser);
  const [editOpen, setEditOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const openEditModal = () => {
    setFormData({
      name: userInfo?.name || "",
      email: userInfo?.email || "",
      password: "",
    });

    setMessage("");
    setError("");
    setEditOpen(true);
  };

  const closeEditModal = () => {
    setEditOpen(false);
    setMessage("");
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const payload = {
        name: formData.name,
        email: formData.email,
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      const updatedUser = await updateProfile(payload);

      setUserInfo(updatedUser);
      setMessage("Profile updated successfully");

      setTimeout(() => {
        setEditOpen(false);
        setMessage("");
      }, 900);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="rounded-2xl bg-white shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-[#111217] px-5 py-6 text-white">
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <User size={38} />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-black">
                  {userInfo?.name || "User"}
                </h1>

                <p className="mt-1 text-sm text-white/70">
                  {userInfo?.email || "user@example.com"}
                </p>

                <button
                  onClick={openEditModal}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-[#111217] transition hover:bg-gray-100"
                >
                  <Edit size={15} />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 border-b border-gray-200 bg-white">
            <TopShortcut
              icon={<Package size={22} />}
              label="Orders"
              onClick={() => navigate("/orders")}
            />
            <TopShortcut
              icon={<Heart size={22} />}
              label="Wishlist"
              onClick={() => navigate("/wishlist")}
            />
            <TopShortcut
              icon={<ShoppingCart size={22} />}
              label="Cart"
              onClick={() => navigate("/cart")}
            />
          </div>

          <SectionTitle title="My Shopping" />

          <MenuItem
            icon={<Package />}
            title="My Orders"
            subtitle="Track, return or buy again"
            onClick={() => navigate("/orders")}
          />

          <MenuItem
            icon={<Heart />}
            title="Wishlist"
            subtitle="Your saved products"
            onClick={() => navigate("/wishlist")}
          />

          <MenuItem
            icon={<ShoppingCart />}
            title="My Cart"
            subtitle="View products added to cart"
            onClick={() => navigate("/cart")}
          />

          <SectionTitle title="Account Settings" />

          <MenuItem
            icon={<Edit />}
            title="Edit Profile"
            subtitle="Name, email and password"
            onClick={openEditModal}
          />

          <MenuItem
            icon={<MapPin />}
            title="Saved Addresses"
            subtitle="Manage delivery addresses"
          />

          <MenuItem
            icon={<CreditCard />}
            title="Payment Methods"
            subtitle="Cards, UPI and wallets"
          />

          <MenuItem
            icon={<TicketPercent />}
            title="Coupons"
            subtitle="Available offers and discounts"
          />

          <SectionTitle title="Help & Support" />

          <MenuItem
            icon={<HelpCircle />}
            title="Help Center"
            subtitle="FAQs and customer support"
          />

          <MenuItem
            icon={<Phone />}
            title="Contact Us"
            subtitle="Get help with your orders"
          />

          <MenuItem
            icon={<ShieldCheck />}
            title="Privacy & Security"
            subtitle="Account safety and privacy settings"
          />

          <div className="p-5">
            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 py-4 font-black text-red-600 transition hover:bg-red-600 hover:text-white"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-xl font-black text-[#111217]">
                  Edit Profile
                </h2>
                <p className="text-sm text-gray-500">
                  Update your account details
                </p>
              </div>

              <button
                onClick={closeEditModal}
                className="rounded-full p-2 transition hover:bg-gray-100"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="p-5 space-y-4">
              {message && (
                <div className="rounded-xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700">
                  {message}
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#111217] focus:bg-white"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#111217] focus:bg-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-[#111217] focus:bg-white"
                  placeholder="Leave empty if you don't want to change"
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 rounded-xl border border-gray-200 py-3 font-black text-[#111217] transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-[#111217] py-3 font-black text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    "Saving..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Save size={18} />
                      Save
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function TopShortcut({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 py-5 text-[#111217] transition hover:bg-gray-50"
    >
      <span>{icon}</span>
      <span className="text-sm font-bold">{label}</span>
    </button>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="border-y border-gray-200 bg-gray-50 px-5 py-3">
      <h2 className="text-sm font-black uppercase tracking-wide text-gray-500">
        {title}
      </h2>
    </div>
  );
}

function MenuItem({ icon, title, subtitle, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 border-b border-gray-100 bg-white px-5 py-4 text-left transition hover:bg-gray-50"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6f6f6] text-[#111217]">
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="font-black text-[#111217]">{title}</h3>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      <ChevronRight size={20} className="text-gray-400" />
    </button>
  );
}