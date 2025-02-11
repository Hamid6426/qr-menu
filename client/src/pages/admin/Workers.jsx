export default function Workers() {
  const workers = [
    {
      id: 1,
      name: "John Doe",
      role: "Cook",
      restaurant: "Food Haven",
      shift: "Morning",
      time: "9:00 AM - 1:00 PM",
      actions: "Cooked",
    },
    {
      id: 2,
      name: "Jane Smith",
      role: "Waiter",
      restaurant: "Spice Corner",
      shift: "Evening",
      time: "4:00 PM - 10:00 PM",
      actions: "Serving",
    },
    {
      id: 3,
      name: "Mike Brown",
      role: "Manager",
      restaurant: "Green Delights",
      shift: "Full Day",
      time: "9:00 AM - 6:00 PM",
      actions: "Online",
    },
    {
      id: 4,
      name: "Alice Johnson",
      role: "Cook",
      restaurant: "Spice Corner",
      shift: "Night",
      time: "10:00 PM - 6:00 AM",
      actions: "Cooking",
    },
  ];

  return (
    <div className="w-full min-h-screen px-6">
      <h2 className="text-3xl font-black my-4">Workers</h2>
      <div className="max-w-6xl mx-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">ID</th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">Name</th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">Role</th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">Restaurant</th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">Shift</th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">Time</th>
              <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border border-gray-300 py-2 px-4 text-sm">{worker.id}</td>
                <td className="border border-gray-300 py-2 px-4 text-sm">{worker.name}</td>
                <td className="border border-gray-300 py-2 px-4 text-sm">{worker.role}</td>
                <td className="border border-gray-300 py-2 px-4 text-sm">{worker.restaurant}</td>
                <td className="border border-gray-300 py-2 px-4 text-sm">{worker.shift}</td>
                <td className="border border-gray-300 py-2 px-4 text-sm">{worker.time}</td>
                <td className="border border-gray-300 py-2 px-4 text-sm">
                  <button className="bg-red-500 text-white py-1 px-3 rounded-md text-sm font-bold hover:bg-rose-600">
                    {worker.actions}
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
