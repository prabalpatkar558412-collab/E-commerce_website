export default function Orders() {
  const orders = [
    { id: "ORD202601", customer: "Prabal Patkar", amount: 2499, status: "Delivered" },
    { id: "ORD202602", customer: "Aman Sharma", amount: 3299, status: "Processing" },
    { id: "ORD202603", customer: "Riya Verma", amount: 1899, status: "Pending" },
    { id: "ORD202604", customer: "Rahul Singh", amount: 4599, status: "Shipped" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Orders</h1>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5">Order ID</th>
              <th className="p-5">Customer</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Status</th>
              <th className="p-5">Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="p-5 font-semibold">{order.id}</td>
                <td className="p-5 text-gray-600">{order.customer}</td>
                <td className="p-5 font-bold text-blue-700">₹{order.amount}</td>
                <td className="p-5">
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {order.status}
                  </span>
                </td>
                <td className="p-5">
                  <select className="border rounded-xl px-3 py-2">
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}