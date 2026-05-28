import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../config";


function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const GET_API = `${API_URL}/api/orders/admin/all`;
  const UPDATE_API = `${API_URL}/api/orders/admin/update`;

  const fetchOrders = async () => {
    try {
      const res = await axios.get(GET_API);

      setOrders(res.data.orders || []);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message ||
"Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${UPDATE_API}/${id}`, {
        status,
      });

      alert("Order status updated");

      fetchOrders();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message ||
"Failed to update order status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Manage Orders
      </h1>

      <div className="max-w-6xl mx-auto space-y-6">
        {orders.length === 0 ? (
          <h2 className="text-center text-2xl">
            No orders found
          </h2>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-xl shadow"
            >
              <div className="flex justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    Order ID: {order._id}
                  </h2>

                  <p className="mt-2">
                    <b>Name:</b> {order.name || "Customer"}
                  </p>

                  <p>
                    <b>Phone:</b> {order.phone}
                  </p>

                  <p>
                    <b>Address:</b> {order.address}, {order.city}
                  </p>

                  <p>
                    <b>Total:</b> ₹{order.totalPrice}
                  </p>

                  <p>
                    <b>Payment:</b> {order.paymentMethod || "COD"}
                  </p>

                  <p>
                    <b>Status:</b>{" "}
                    <span className="text-red-500 font-bold">
                      {order.status}
                    </span>
                  </p>
                </div>

                <div>
                  <select
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                    className="border p-3 rounded"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">
                      Out for Delivery
                    </option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-xl font-bold mb-3">
                  Items
                </h3>

                {order.items?.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b py-2"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ManageOrders;