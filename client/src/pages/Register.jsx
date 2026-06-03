import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
  User,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { registerUser, googleLogin } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!acceptedTerms) {
      setMessage("Please accept Terms & Conditions");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await registerUser(formData);

      navigate("/");
    } catch (error) {
      setMessage(error?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    try {
      setMessage("");

      const user = await googleLogin(credentialResponse.credential);

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Google signup failed"
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#f8f5f1] px-4 py-8 md:py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1fr_460px]">
        <section className="hidden lg:block">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#111217] p-10 text-white shadow-2xl">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(184,121,58,0.35),transparent_35%),radial-gradient(circle_at_85%_85%,rgba(255,255,255,0.08),transparent_30%)]" />

            <div className="relative z-10">
              <Link to="/" className="mb-20 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#b8793a] text-white">
                  <ShoppingBag size={23} />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    Shop<span className="text-[#f6c27a]">Sphere</span>
                  </h2>
                  <p className="text-xs text-white/50">
                    Premium Shopping Store
                  </p>
                </div>
              </Link>

              <p className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-[#f6c27a]">
                Join Premium Shopping
              </p>

              <h1 className="max-w-xl text-5xl font-black leading-tight">
                Create your account and shop smarter.
              </h1>

              <p className="mt-5 max-w-lg text-white/60">
                Track orders, save wishlist items, manage cart and enjoy faster
                shopping with ShopSphere.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <InfoBox title="Secure" text="Checkout" />
                <InfoBox title="Fast" text="Delivery" />
                <InfoBox title="Easy" text="Wishlist" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-md">
          <div className="mb-6 text-center lg:hidden">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#111217] text-white">
                <ShoppingBag size={23} />
              </div>

              <div className="text-left">
                <h2 className="text-2xl font-black text-[#171717]">
                  Shop<span className="text-[#b8793a]">Sphere</span>
                </h2>
                <p className="text-xs text-gray-500">Premium Store</p>
              </div>
            </Link>
          </div>

          <div className="rounded-[2rem] border border-[#ece7df] bg-white p-6 shadow-xl md:p-8">
            <div className="mb-6">
              <p className="mb-2 text-sm font-black uppercase tracking-wide text-[#b8793a]">
                Create Account
              </p>

              <h1 className="text-3xl font-black text-[#171717]">
                Welcome to ShopSphere
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Register to start your shopping journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputBox
                icon={<User size={19} />}
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
              />

              <InputBox
                icon={<Mail size={19} />}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
              />

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-4 text-gray-400"
                />

                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-2xl border border-[#ece7df] bg-[#f8f5f1] py-4 pl-12 pr-12 outline-none transition focus:border-[#b8793a] focus:bg-white"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-[#171717]"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              {message && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600">
                  {message}
                </div>
              )}

              <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 accent-[#b8793a]"
                />

                <span>
                  I agree to the{" "}
                  <span className="font-bold text-[#171717]">
                    Terms & Conditions
                  </span>{" "}
                  and{" "}
                  <span className="font-bold text-[#171717]">
                    Privacy Policy
                  </span>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b8793a] py-4 font-black text-white shadow-lg shadow-[#b8793a]/25 transition hover:bg-[#111217] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}

                {!loading && (
                  <ArrowRight
                    size={20}
                    className="transition group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#ece7df]" />
              <span className="text-sm text-gray-400">or</span>
              <div className="h-px flex-1 bg-[#ece7df]" />
            </div>

            <div className="flex justify-center overflow-hidden rounded-2xl">
              <GoogleLogin
                onSuccess={handleGoogleRegister}
                onError={() => {
                  setMessage("Google signup failed");
                }}
                theme="outline"
                size="large"
                width="350"
              />
            </div>

            <p className="mt-5 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-black text-[#b8793a]">
                Login
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function InputBox({ icon, name, type, value, onChange, placeholder }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-4 text-gray-400">{icon}</span>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#ece7df] bg-[#f8f5f1] py-4 pl-12 pr-4 outline-none transition focus:border-[#b8793a] focus:bg-white"
        required
      />
    </div>
  );
}

function InfoBox({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <h3 className="text-xl font-black text-[#f6c27a]">{title}</h3>
      <p className="text-sm text-white/60">{text}</p>
    </div>
  );
}