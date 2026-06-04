import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { getProductById } from "../services/productService";
import { addToCart } from "../services/cartService";
import { addToWishlist } from "../services/wishlistService";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingCart, setAddingCart] = useState(false);
  const [addingWishlist, setAddingWishlist] = useState(false);
  const [wishlistAdded, setWishlistAdded] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const backendBaseUrl = import.meta.env.VITE_API_URL
    ? import.meta.env.VITE_API_URL.replace("/api", "")
    : "http://localhost:5000";

  const getProductImageUrl = (image) => {
    if (!image) {
      return "https://placehold.co/800x800?text=No+Image";
    }

    if (image.startsWith("http://localhost:5000")) {
      return image.replace("http://localhost:5000", backendBaseUrl);
    }

    if (image.startsWith("https://localhost:5000")) {
      return image.replace("https://localhost:5000", backendBaseUrl);
    }

    if (image.startsWith("http")) {
      return image;
    }

    if (image.startsWith("/uploads")) {
      return `${backendBaseUrl}${image}`;
    }

    return `${backendBaseUrl}/uploads/${image}`;
  };

  const isLoggedIn = () => {
    return !!localStorage.getItem("userInfo");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const data = await getProductById(id);

        setProduct(data);
        setError("");
      } catch (err) {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      setAddingCart(true);
      setMessage("");

      await addToCart(product._id, 1);

      setMessage("Product added to cart successfully!");
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to add product to cart"
      );
    } finally {
      setAddingCart(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    try {
      setAddingWishlist(true);
      setMessage("");

      await addToWishlist(product._id);

      setWishlistAdded(true);
      setMessage("Product added to wishlist successfully!");
    } catch (error) {
      setMessage(
        error?.response?.data?.message ||
          "Failed to add product to wishlist"
      );
    } finally {
      setAddingWishlist(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">Loading Product...</h1>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const productImage = getProductImageUrl(product?.image);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-gray-100 rounded-3xl overflow-hidden">
          <img
            src={productImage}
            alt={product?.name || "Product image"}
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x800?text=No+Image";
            }}
            className="w-full h-[520px] object-cover"
          />
        </div>

        <div>
          <p className="text-blue-700 font-semibold mb-3">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-yellow-500 mb-6">
            <Star size={20} fill="currentColor" />
            <span className="text-gray-700 font-medium">
              {product.rating || 0} Rating
            </span>
          </div>

          <p className="text-3xl font-bold text-blue-700 mb-6">
            ₹{product.price}
          </p>

          <p className="text-gray-600 leading-7 mb-8">
            {product.description}
          </p>

          {message && (
            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-700 font-semibold">
              {message}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              disabled={addingCart}
              className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold disabled:opacity-60"
            >
              <ShoppingCart size={20} />
              {addingCart ? "Adding..." : "Add to Cart"}
            </button>

            <button
              onClick={handleAddToWishlist}
              disabled={addingWishlist}
              className={`flex items-center justify-center gap-2 border px-8 py-4 rounded-xl font-semibold transition disabled:opacity-60 ${
                wishlistAdded
                  ? "border-red-500 bg-red-50 text-red-600"
                  : "border-gray-300 text-gray-900 hover:border-red-500 hover:text-red-600"
              }`}
            >
              <Heart
                size={20}
                fill={wishlistAdded ? "currentColor" : "none"}
              />
              {addingWishlist
                ? "Adding..."
                : wishlistAdded
                ? "Wishlisted"
                : "Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}