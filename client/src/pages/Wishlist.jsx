import { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  getWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../services/wishlistService";

export default function Wishlist() {
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const wishlistItems = wishlist?.products || [];

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setMessage("");

      const data = await getWishlist();
      setWishlist(data);
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to load wishlist"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updatedWishlist = await removeFromWishlist(productId);
      setWishlist(updatedWishlist);
      setMessage("Product removed from wishlist");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to remove product"
      );
    }
  };

  const handleClearWishlist = async () => {
    try {
      const updatedWishlist = await clearWishlist();
      setWishlist(updatedWishlist);
      setMessage("Wishlist cleared successfully");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to clear wishlist"
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6 rounded-2xl bg-white border border-gray-200 shadow-sm p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-pink-600">
                  <Heart size={24} fill="currentColor" />
                </div>

                <div>
                  <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                    My Wishlist
                  </h1>

                  <p className="text-sm text-gray-500 mt-1">
                    {wishlistItems.length} saved products
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/products")}
                className="rounded-xl border border-gray-200 bg-white px-5 py-3 font-bold text-gray-800 hover:bg-gray-50"
              >
                Continue Shopping
              </button>

              <button
                onClick={handleClearWishlist}
                disabled={wishlistItems.length === 0}
                className="rounded-xl border border-red-200 bg-red-50 px-5 py-3 font-bold text-red-600 hover:bg-red-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700">
            {message}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl bg-white border border-gray-200 p-10 text-center shadow-sm">
            <div className="flex items-center justify-center gap-3 font-black text-gray-900">
              <Loader2 size={24} className="animate-spin" />
              Loading wishlist...
            </div>
          </div>
        ) : wishlistItems.length === 0 ? (
          <div className="rounded-2xl bg-white border border-gray-200 p-12 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50 text-pink-600">
              <Heart size={38} />
            </div>

            <h2 className="text-2xl font-black text-gray-900">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Save products you love and view them here anytime.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#111217] px-6 py-3 font-black text-white hover:bg-[#b8793a]"
            >
              Start Shopping
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {wishlistItems.map((product) => (
                <WishlistItem
                  key={product._id}
                  product={product}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="sticky bottom-4 mt-8 rounded-2xl bg-white border border-gray-200 shadow-xl p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h3 className="font-black text-gray-900">
                    {wishlistItems.length} items saved
                  </h3>
                  <p className="text-sm text-gray-500">
                    Move your favorite products to cart when ready.
                  </p>
                </div>

                <button
                  onClick={() => navigate("/cart")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#111217] px-6 py-3 font-black text-white hover:bg-[#b8793a]"
                >
                  Go To Cart
                  <ShoppingCart size={19} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function WishlistItem({ product, onRemove }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition">
      <div className="relative">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover bg-gray-100"
          />
        </Link>

        <button
          onClick={() => onRemove(product._id)}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-500 shadow-md hover:bg-red-500 hover:text-white"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="p-4">
        <p className="text-xs font-black uppercase tracking-wide text-[#b8793a]">
          {product.category}
        </p>

        <Link to={`/product/${product._id}`}>
          <h2 className="mt-2 line-clamp-2 text-lg font-black text-gray-900 hover:text-[#b8793a]">
            {product.name}
          </h2>
        </Link>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xl font-black text-gray-900">
              ₹{product.price}
            </p>

            <p className="text-sm text-gray-400 line-through">
              ₹{Math.floor(product.price * 1.25)}
            </p>
          </div>

          <button className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111217] text-white hover:bg-[#b8793a]">
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}