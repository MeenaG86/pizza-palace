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

        <p>{pizza.description}</p>

        <div className="flex justify-between items-center mt-4">

          <span className="text-red-500 font-bold">
            ₹{pizza.price}
          </span>

          <button
            onClick={() =>{  console.log(pizza);
 dispatch(addToCart(pizza))}}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default PizzaCard;