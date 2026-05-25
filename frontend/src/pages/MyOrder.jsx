import { useEffect, useState } from "react";
import { API_URL } from "../config";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/api/orders`);

      const data = await res.json();

      console.log(data);

      setOrders(data.orders || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 pt-28 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-xl">No orders found</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-bold text-red-500">
                Total: ₹{order.totalPrice}
              </h2>

              <p>📍 {order.address}, {order.city}</p>
              <p>📞 {order.phone}</p>
              <p>💳 {order.paymentMethod || "COD"}</p>

              <p className="mt-2 font-semibold">
                Status: {order.status || "Pending"}
              </p>

              <div className="mt-4">
                <h3 className="font-bold">Items:</h3>

                {order.items?.map((item, index) => (
                  <p key={index}>
                    🍕 {item.name} × {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;