import { Edit, Trash2 } from "lucide-react";

export default function Categories() {
  const categories = [
    { id: 1, name: "Electronics", products: 120 },
    { id: 2, name: "Fashion", products: 85 },
    { id: 3, name: "Shoes", products: 64 },
    { id: 4, name: "Accessories", products: 51 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            className="flex-1 border rounded-xl px-4 py-3"
            placeholder="Category Name"
          />

          <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-semibold">
            Add Category
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5">Category</th>
              <th className="p-5">Products</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((item) => (
              <tr key={item.id} className="border-b last:border-b-0">
                <td className="p-5 font-semibold">{item.name}</td>
                <td className="p-5 text-gray-600">{item.products}</td>
                <td className="p-5 flex gap-3">
                  <button className="p-2 rounded-lg bg-blue-50 text-blue-700">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 rounded-lg bg-red-50 text-red-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}