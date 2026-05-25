import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../Redux/cartSlice";
import {toast} from "react-toastify"
import { API_URL } from "../config";

function Checkout() {

  const dispatch = useDispatch();

  // Redux cart
  const cartItems = useSelector((state) => state.cart.cartItems);

  // States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [payment] = useState("COD"); // ONLY COD

  // Price calculation
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const delivery = subtotal > 0 ? 50 : 0;

  const totalPrice = subtotal + delivery;

  // Place Order
  const handlePlaceOrder = async () => {

    if (!name || !phone || !address || !city || !pincode) {
      toast.success("Please fill all fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.success("Cart is empty");
      return;
    }

    const orderData = {
      name,
      phone,
      address,
      city,
      pincode,
      paymentMethod: payment,
      items: cartItems,
      subtotal,
      delivery,
      totalPrice,
    };

    try {

      const response = await fetch(
        "${API_URL}/api/orders/place",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();

      if (data.success) {

        toast.success("Order placed successfully");

        // Clear cart
        dispatch(clearCart());

        // Clear form
        setName("");
        setPhone("");
        setAddress("");
        setCity("");
        setPincode("");

      } else {
        toast.success("Order failed");
      }

    } catch (error) {
      console.log(error);
      toast.success(error.response?.data?.message ||
" Something went wrong");
    }
  };

  return (

    <section className="min-h-screen bg-[#111] text-white px-6 py-28">

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-14">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT - FORM */}
          <div className="lg:col-span-2 bg-black rounded-2xl p-8">

            <h2 className="text-3xl font-bold mb-8">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Name */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700"
              />

              {/* Phone */}
              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700"
              />

              {/* Address */}
              <textarea
                rows="4"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="md:col-span-2 w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700"
              />

              {/* City */}
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700"
              />

              {/* Pincode */}
              <input
                type="text"
                placeholder="Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700"
              />

            </div>

            {/* Payment (COD ONLY) */}
            <div className="mt-10">

              <h3 className="text-2xl font-bold mb-5">
                Payment Method
              </h3>

              <div className="bg-gray-700 p-4 rounded-xl opacity-60">
                Cash on Delivery (Only Available)
              </div>

            </div>

          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-black rounded-2xl p-8 h-fit">

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5 text-lg">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹{delivery}</span>
              </div>

              <div className="border-t border-gray-700 pt-5 flex justify-between text-2xl font-bold">

                <span>Total</span>
                <span className="text-red-500">
                  ₹{totalPrice}
                </span>

              </div>

            </div>

            {/* BUTTON */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-8 bg-red-500 hover:bg-red-600 py-4 rounded-xl text-lg font-semibold"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;