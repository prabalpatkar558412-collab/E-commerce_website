import { useState } from "react";
import {
  ImagePlus,
  Upload,
  X,
  Loader2,
  PackagePlus,
} from "lucide-react";
import {
  createProduct,
  uploadProductImage,
} from "../../services/productService";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const imageBaseURL = "http://localhost:5000";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setMessage("");
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage("");
    setFormData({
      ...formData,
      image: "",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      category: "",
      price: "",
      stock: "",
      image: "",
      description: "",
    });

    setSelectedImage(null);
    setPreviewImage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      if (!selectedImage) {
        setMessage("Please upload a product image");
        return;
      }

      const uploadResult = await uploadProductImage(selectedImage);

      const imagePath = uploadResult.image;

      await createProduct({
        ...formData,
        image: `${imageBaseURL}${imagePath}`,
        price: Number(formData.price),
        stock: Number(formData.stock),
      });

      setMessage("Product added successfully!");
      resetForm();
    } catch (error) {
      setMessage(
        error?.response?.data?.message || "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-black text-gray-900">
          Add Product
        </h1>
        <p className="mt-2 text-gray-500">
          Add a new product with image upload, price, stock and description.
        </p>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="grid gap-6 lg:grid-cols-[360px_1fr]"
        >
          <div>
            <label className="mb-3 block font-black text-gray-800">
              Product Image
            </label>

            <div className="rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 p-4">
              {previewImage ? (
                <div className="relative overflow-hidden rounded-2xl bg-white">
                  <img
                    src={previewImage}
                    alt="Product Preview"
                    className="h-72 w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:bg-red-600"
                  >
                    <X size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl bg-white text-center transition hover:bg-gray-100">
                  <ImagePlus size={52} className="text-gray-400" />

                  <span className="mt-4 text-lg font-black text-gray-800">
                    Upload Product Image
                  </span>

                  <span className="mt-2 max-w-xs text-sm text-gray-500">
                    Choose JPG, PNG or WEBP image from your computer.
                  </span>

                  <span className="mt-5 inline-flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-black text-white">
                    <Upload size={18} />
                    Choose Image
                  </span>

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
            />

            <InputField
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Brand"
            />

            <InputField
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />

            <InputField
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />

            <InputField
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Shoes">Shoes</option>
              <option value="Accessories">Accessories</option>
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="min-h-36 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900 md:col-span-2"
              placeholder="Product Description"
              required
            />

            {message && (
              <div
                className={`rounded-xl border p-4 font-bold md:col-span-2 ${
                  message.includes("successfully")
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-700 py-4 font-black text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50 md:col-span-2"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Saving Product...
                </>
              ) : (
                <>
                  <PackagePlus size={20} />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-gray-900"
      placeholder={placeholder}
      required
    />
  );
}