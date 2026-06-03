import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShoppingBag,
  ShieldCheck,
  Truck,
  Heart,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { loginUser, googleLogin } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const redirectUser = (user) => {
    if (user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const user = await loginUser(formData);
      redirectUser(user);
    } catch (error) {
      setMessage(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setMessage("");

      const user = await googleLogin(credentialResponse.credential);
      redirectUser(user);
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Google login failed"
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
                Welcome Back
              </p>

              <h1 className="max-w-xl text-5xl font-black leading-tight">
                Continue your premium shopping experience.
              </h1>

              <p className="mt-5 max-w-lg text-white/60">
                Access your orders, wishlist, cart and secure checkout in one
                simple account.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <InfoBox
                  icon={<Truck size={22} />}
                  title="Fast"
                  text="Delivery"
                />
                <InfoBox
                  icon={<ShieldCheck size={22} />}
                  title="Secure"
                  text="Checkout"
                />
                <InfoBox
                  icon={<Heart size={22} />}
                  title="Easy"
                  text="Wishlist"
                />
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
                Login Account
              </p>

              <h1 className="text-3xl font-black text-[#171717]">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Login to continue shopping.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-[#b8793a]"
                  />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="font-bold text-[#b8793a] hover:text-[#171717]"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-[#b8793a] py-4 font-black text-white shadow-lg shadow-[#b8793a]/25 transition hover:bg-[#111217] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}

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

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => {
                  setMessage("Google login failed");
                }}
                theme="outline"
                size="large"
                width="350"
              />
            </div>

            <p className="mt-5 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-black text-[#b8793a]">
                Register
              </Link>
            </p>

            <Link
              to="/"
              className="mt-5 block text-center font-semibold text-gray-500 transition hover:text-[#b8793a]"
            >
              Back to Home
            </Link>
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

function InfoBox({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
      <div className="mb-2 text-[#f6c27a]">{icon}</div>
      <h3 className="text-xl font-black text-[#f6c27a]">{title}</h3>
      <p className="text-sm text-white/60">{text}</p>
    </div>
  );
}