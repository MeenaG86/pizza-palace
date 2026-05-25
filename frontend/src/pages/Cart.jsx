import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../Redux/cartSlice";

function Cart() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (

        <div className="text-center">
          <p className="text-xl mb-4">Cart is Empty</p>

          <Link to="/">
            <button className="bg-red-500 text-white px-6 py-3 rounded-lg">
              Go Shopping
            </button>
          </Link>

        </div>

      ) : (

        <div className="max-w-4xl mx-auto">

          {/* Cart Items */}
          {cartItems.map((item) => (

            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-4 mb-5 flex items-center justify-between"
            >

              <div className="flex items-center gap-4">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />

                <div>

                  <h2 className="text-2xl font-semibold">
                    {item.name}
                  </h2>

                  <p className="text-gray-600">
                    ₹{item.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">

                    <button
                      onClick={() => dispatch(decreaseQuantity(item._id))}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span className="text-lg font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => dispatch(increaseQuantity(item._id))}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>

              <div className="text-right">

                <h2 className="text-xl font-bold text-red-500 mb-3">
                  ₹{item.price * item.quantity}
                </h2>

                <button
                  onClick={() => dispatch(removeFromCart(item._id))}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

          {/* Total Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">

            <h2 className="text-3xl font-bold mb-6">
              Total: ₹{totalPrice}
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">

              {/* Checkout Button */}
              <Link to="/checkout" className="w-full">

                <button className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg">
                  Proceed To Checkout
                </button>

              </Link>

              {/* Optional Button (Disabled Payment) */}
              <button
                disabled
                className="w-full bg-gray-400 text-white px-6 py-3 rounded-lg text-lg cursor-not-allowed"
              >
                Online Payment (Coming Soon)
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Cart;