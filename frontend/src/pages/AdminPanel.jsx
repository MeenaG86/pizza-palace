import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
function AdminPanel() {

  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const res = await fetch("${API_URL}/api/orders/admin/all");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API_URL}/api/orders/admin/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {

  const token = localStorage.getItem("adminToken");

  if (!token) {
    navigate("/admin-login");
  }

}, []);

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Panel - Orders
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">

        {orders.map((order) => (

          <div key={order._id} className="bg-white p-6 rounded-lg shadow">

            <h2 className="text-xl font-bold text-red-500">
              ₹{order.totalPrice}
            </h2>

            <p>📍 {order.address}, {order.city}</p>
            <p>📞 {order.phone}</p>
            <p>💳 {order.paymentMethod}</p>

            <p className="mt-2 font-semibold">
              Status: <span className="text-blue-600">{order.status}</span>
            </p>

            {/* Items */}
            <div className="mt-3">
              <h3 className="font-bold">Items:</h3>

              {order.items?.map((item, index) => (
                <p key={index}>
                  🍕 {item.name} × {item.quantity}
                </p>
              ))}

            </div>

            {/* Status Buttons */}
            <div className="flex gap-3 mt-4">

              <button
                onClick={() => updateStatus(order._id, "Preparing")}
                className="bg-yellow-500 px-3 py-1 rounded text-white"
              >
                Preparing
              </button>

              <button
                onClick={() => updateStatus(order._id, "Out for Delivery")}
                className="bg-blue-500 px-3 py-1 rounded text-white"
              >
                Out for Delivery
              </button>

              <button
                onClick={() => updateStatus(order._id, "Delivered")}
                className="bg-green-500 px-3 py-1 rounded text-white"
              >
                Delivered
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default AdminPanel;