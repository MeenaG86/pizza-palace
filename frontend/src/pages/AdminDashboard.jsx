import { useEffect, useState } from "react";

function AdminDashboard() {

  const [stats, setStats] = useState(null);

  const fetchStats = async () => {

    try {

      const res = await fetch(
        "http://localhost:5000/api/orders/admin/stats"
      );

      const data = await res.json();

      setStats(data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) {
    return (
      <h1 className="text-center mt-10 text-2xl">
        Loading...
      </h1>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {/* Orders */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold text-gray-600">
            Total Orders
          </h2>

          <p className="text-4xl font-bold mt-4 text-red-500">
            {stats.totalOrders}
          </p>

        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold text-gray-600">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-4 text-green-500">
            ₹{stats.totalRevenue}
          </p>

        </div>

        {/* Pizzas */}
        <div className="bg-white p-6 rounded-xl shadow">

          <h2 className="text-xl font-semibold text-gray-600">
            Total Pizzas Sold
          </h2>

          <p className="text-4xl font-bold mt-4 text-blue-500">
            {stats.totalPizzas}
          </p>

        </div>

      </div>

      {/* Latest Orders */}
      <div className="max-w-6xl mx-auto mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Latest Orders
        </h2>

        <div className="space-y-5">

          {stats.latestOrders.map((order) => (

            <div
              key={order._id}
              className="bg-white p-5 rounded-xl shadow"
            >

              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-bold text-xl">
                    ₹{order.totalPrice}
                  </h3>

                  <p>
                    {order.address}, {order.city}
                  </p>

                  <p>{order.phone}</p>
                </div>

                <div>
                  <span className="bg-red-500 text-white px-4 py-2 rounded">
                    {order.status}
                  </span>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    {/* Admin Actions */}
<div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">

  <a
    href="/admin/pizzas"
    className="bg-red-500 text-white p-8 rounded-xl shadow text-center hover:bg-red-600"
  >
    <h2 className="text-2xl font-bold">
      Manage Pizzas
    </h2>

    <p className="mt-3">
      Add, edit and delete pizzas
    </p>
  </a>

  <a
    href="/admin/orders"
    className="bg-green-600 text-white p-8 rounded-xl shadow text-center hover:bg-green-700"
  >
    <h2 className="text-2xl font-bold">
      Manage Orders
    </h2>

    <p className="mt-3">
      Update customer order status
    </p>
  </a>

</div>
    </div>
  );
}

export default AdminDashboard;