import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";

function PizzaDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [pizza, setPizza] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/pizzas/${id}`)
      .then((res) => {
        setPizza(res.data.pizza);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  if (!pizza) {
    return <h2 className="pt-32 text-center text-2xl">Loading...</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={pizza.image}
          alt={pizza.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        <div>
          <h1 className="text-4xl font-bold text-red-500 mb-4">
            {pizza.name}
          </h1>

          <p className="text-gray-600 mb-4">{pizza.description}</p>

          <p className="text-lg mb-3">
            <b>Category:</b> {pizza.category}
          </p>

          <p className="text-3xl font-bold mb-6">₹{pizza.price}</p>

          <button
            onClick={() => dispatch(addToCart(pizza))}
            className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzaDetails;