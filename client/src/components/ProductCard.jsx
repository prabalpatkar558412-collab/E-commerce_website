import { useState } from "react";
import { Heart, ShoppingBag, Star, Eye, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { addToWishlist } from "../services/wishlistService";
import { addToCart } from "../services/cartService";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [cartAdded, setCartAdded] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);

  const productId = product?._id || product?.id;

  const backendBaseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api", "")
    : "http://localhost:5000";

  const productImage = product?.image?.startsWith("http")
    ? product.image
    : `${backendBaseUrl}${product?.image}`;

  const isLoggedIn = () => {
    return !!localStorage.getItem("userInfo");
  };

  const handleAddToWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    if (!productId) {
      alert("Product ID not found");
      return;
    }

    try {
      setLoadingWishlist(true);
      await addToWishlist(productId);
      setWishlistAdded(true);
      alert("Product added to wishlist");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to add product to wishlist"
      );
    } finally {
      setLoadingWishlist(false);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    if (!productId) {
      alert("Product ID not found");
      return;
    }

    try {
      setLoadingCart(true);
      await addToCart(productId, 1);

      setCartAdded(true);

      setTimeout(() => {
        setCartAdded(false);
      }, 1200);
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Failed to add product to cart"
      );
    } finally {
      setLoadingCart(false);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.25 }}
      className="group bg-white rounded-[2rem] overflow-hidden border border-[#ece7df] shadow-lg hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative overflow-hidden bg-[#f8f5f1]">
        <Link to={`/product/${productId}`}>
          <img
            src={productImage}
            alt={product?.name || "Product image"}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/600x600?text=No+Image";
            }}
            className="w-full h-80 object-cover transition duration-700 group-hover:scale-110"
          />
        </Link>

        <div className="absolute top-4 left-4">
          <span className="bg-[#171717] text-white text-xs font-black px-3 py-2 rounded-full">
            NEW
          </span>
        </div>

        <button
          type="button"
          onClick={handleAddToWishlist}
          disabled={loadingWishlist}
          className={`absolute top-4 right-4 z-20 h-11 w-11 rounded-full shadow-lg flex items-center justify-center transition ${
            wishlistAdded
              ? "bg-red-500 text-white"
              : "bg-white text-[#171717] hover:bg-red-500 hover:text-white"
          } disabled:opacity-70`}
        >
          <Heart
            size={18}
            fill={wishlistAdded ? "currentColor" : "none"}
          />
        </button>

        <div className="absolute inset-0 pointer-events-none bg-black/0 group-hover:bg-black/10 transition duration-500" />

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
          <Link
            to={`/product/${productId}`}
            className="flex items-center gap-2 bg-white text-black px-5 py-3 rounded-full font-bold shadow-xl hover:bg-black hover:text-white transition"
          >
            <Eye size={17} />
            Quick View
          </Link>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-1 mb-3">
          <Star
            size={15}
            fill="currentColor"
            className="text-yellow-500"
          />

          <span className="text-sm font-semibold text-gray-700">
            {product?.rating || 4.5}
          </span>
        </div>

        <Link to={`/product/${productId}`}>
          <h3 className="text-lg font-black text-[#171717] leading-snug hover:text-[#b8793a] transition">
            {product?.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 mt-2 mb-5">
          {product?.category}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-black text-[#171717]">
              ₹{product?.price}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ₹{Math.floor((product?.price || 0) * 1.25)}
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={loadingCart}
            className={`h-12 w-12 rounded-full text-white flex items-center justify-center transition disabled:opacity-70 ${
              cartAdded
                ? "bg-green-600"
                : "bg-[#171717] hover:bg-[#b8793a]"
            }`}
          >
            {cartAdded ? <Check size={18} /> : <ShoppingBag size={18} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}