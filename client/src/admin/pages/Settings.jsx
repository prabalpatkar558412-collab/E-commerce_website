export default function Settings() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Admin Settings
      </h1>

      <div className="bg-white border border-gray-200 rounded-3xl p-6">
        <form className="grid md:grid-cols-2 gap-5">
          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Store Name"
            defaultValue="ShopSphere"
          />

          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Support Email"
            defaultValue="support@shopsphere.com"
          />

          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Phone Number"
            defaultValue="+91 9876543210"
          />

          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Currency"
            defaultValue="INR"
          />

          <textarea
            className="border rounded-xl px-4 py-3 md:col-span-2 min-h-32"
            placeholder="Store Address"
            defaultValue="Bhopal, Madhya Pradesh, India"
          />

          <button className="md:col-span-2 bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-semibold">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}