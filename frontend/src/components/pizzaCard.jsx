import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice.js";

function PizzaCard({ pizza }) {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-2xl font-bold">
          {pizza.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {pizza.description}
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-red-500 font-bold">
            ₹{pizza.price}
          </span>

          <button
            onClick={() => dispatch(addToCart(pizza))}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Add to Cart
          </button>
        </div>

        <Link
          to={`/pizza/${pizza._id}`}
          className="block text-center mt-4 border border-red-500 text-red-500 py-2 rounded-lg hover:bg-red-500 hover:text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default PizzaCard;