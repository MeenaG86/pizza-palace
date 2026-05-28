function Orders() {

  const orders = [
    {
      id: "#PP101",
      pizza: "Cheese Burst Pizza",
      price: 299,
      status: "Preparing",
      payment: "Paid",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: "#PP102",
      pizza: "Pepperoni Pizza",
      price: 349,
      status: "Delivered",
      payment: "Paid",
      image:
        "https://images.unsplash.com/photo-1548365328-9f547fb0953b?q=80&w=1200&auto=format&fit=crop",
    },

    {
      id: "#PP103",
      pizza: "Veggie Pizza",
      price: 249,
      status: "Pending",
      payment: "Cash on Delivery",
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (

    <section className="min-h-screen bg-[#111] text-white px-6 py-28">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-14">
          My Orders
        </h1>

        {/* Orders */}
        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-black rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center"
            >

              {/* Image */}
              <img
                src={order.image}
                alt={order.pizza}
                className="w-40 h-40 rounded-xl object-cover"
              />

              {/* Content */}
              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {order.pizza}
                </h2>

                <p className="text-gray-400 mt-2">
                  Order ID: {order.id}
                </p>

                <p className="text-red-500 text-xl mt-3">
                  ₹{order.price}
                </p>

                {/* Status */}
                <div className="flex flex-wrap gap-4 mt-5">

                  <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold">

                    {order.status}

                  </span>

                  <span className="bg-green-500 text-black px-4 py-2 rounded-lg font-semibold">

                    {order.payment}

                  </span>

                </div>

              </div>

              {/* Button */}
              <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold duration-300">

                Track Order

              </button>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default Orders;