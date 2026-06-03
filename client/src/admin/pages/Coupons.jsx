export default function Coupons() {
  const coupons = [
    {
      id: 1,
      code: "WELCOME10",
      discount: "10%",
      expiry: "31 Dec 2026",
    },
    {
      id: 2,
      code: "SUMMER20",
      discount: "20%",
      expiry: "15 Aug 2026",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Coupons Management
      </h1>

      <div className="bg-white border border-gray-200 rounded-3xl p-6 mb-8">
        <div className="grid md:grid-cols-3 gap-4">
          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Coupon Code"
          />

          <input
            className="border rounded-xl px-4 py-3"
            placeholder="Discount %"
          />

          <button className="bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-semibold">
            Create Coupon
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5">Coupon Code</th>
              <th className="p-5">Discount</th>
              <th className="p-5">Expiry</th>
              <th className="p-5">Status</th>
            </tr>
          </thead>

          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b last:border-b-0">
                <td className="p-5 font-semibold">{coupon.code}</td>
                <td className="p-5">{coupon.discount}</td>
                <td className="p-5">{coupon.expiry}</td>
                <td className="p-5">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}