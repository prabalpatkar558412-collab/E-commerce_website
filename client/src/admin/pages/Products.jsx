import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../../services/productService";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      setMessage("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);
      setMessage("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      setMessage(error?.response?.data?.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2">Manage all store products.</p>
        </div>

        <Link
          to="/admin/add-product"
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold"
        >
          Add Product
        </Link>
      </div>

      {message && (
        <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-700 font-medium">
          {message}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center font-semibold text-gray-600">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center font-semibold text-gray-600">
            No products found.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-5">Product</th>
                <th className="p-5">Category</th>
                <th className="p-5">Price</th>
                <th className="p-5">Stock</th>
                <th className="p-5">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item) => (
                <tr key={item._id} className="border-b last:border-b-0">
                  <td className="p-5 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl"
                    />
                    <span className="font-semibold">{item.name}</span>
                  </td>

                  <td className="p-5 text-gray-600">{item.category}</td>

                  <td className="p-5 font-bold text-blue-700">
                    ₹{item.price}
                  </td>

                  <td
                    className={`p-5 font-semibold ${
                      item.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {item.stock > 0 ? `${item.stock} In Stock` : "Out of Stock"}
                  </td>

                  <td className="p-5">
                    <div className="flex gap-3">
                      <button className="p-2 rounded-lg bg-blue-50 text-blue-700">
                        <Edit size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg bg-red-50 text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}