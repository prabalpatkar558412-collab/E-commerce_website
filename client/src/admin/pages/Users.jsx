export default function Users() {
  const users = [
    {
      id: 1,
      name: "Prabal Patkar",
      email: "prabal@gmail.com",
      role: "Customer",
    },
    {
      id: 2,
      name: "Aman Sharma",
      email: "aman@gmail.com",
      role: "Customer",
    },
    {
      id: 3,
      name: "Admin User",
      email: "admin@gmail.com",
      role: "Admin",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Users Management
      </h1>

      <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-5">Name</th>
              <th className="p-5">Email</th>
              <th className="p-5">Role</th>
              <th className="p-5">Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b last:border-b-0">
                <td className="p-5 font-semibold">{user.name}</td>
                <td className="p-5 text-gray-600">{user.email}</td>
                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="p-5">
                  <button className="bg-red-50 text-red-600 px-4 py-2 rounded-xl font-medium">
                    Block User
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