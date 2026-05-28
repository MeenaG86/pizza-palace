import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";

import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/cartSlice";

function Menu() {
  const [pizzas, setPizzas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedPizza, setSelectedPizza] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/pizzas`)
      .then((res) => {
        setPizzas(res.data.pizzas || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filteredPizzas = pizzas.filter((pizza) => {
      // Show only available pizzas
  if (!pizza.isAvailable) {
    return false;
  }

    const pizzaCategory = pizza.category
    ?.toLowerCase()
    .replace(/\s/g, "-");

  const selectedCategory = category.toLowerCase();

    const matchCategory =
      category === "All" || pizza.category === category;

    const matchSearch = pizza.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-28 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Pizza Menu
      </h1>

      {/* Search */}
      <div className="max-w-3xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search pizza..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 rounded-lg border shadow"
        />
      </div>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["All", "Veg", "Non-Veg"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded-lg font-semibold ${
              category === cat
                ? "bg-red-500 text-white"
                : "bg-white text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Pizza Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPizzas.length === 0 ? (
          <p className="text-center text-xl col-span-full">
            No pizzas found
          </p>
        ) : (
          filteredPizzas.map((pizza) => (
            <div
              key={pizza._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <img
                src={pizza.image}
                alt={pizza.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold mb-2">
                  {pizza.name}
                </h2>

                <p className="text-sm text-red-500 font-semibold mb-2">
                  {pizza.category}
                </p>

                <p className="text-gray-600 mb-3">
                  {pizza.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-red-500">
                    ₹{pizza.price}
                  </span>

                  <button
                    onClick={() => setSelectedPizza(pizza)}
                    className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg"
                  >
                    Details
                  </button>
                </div>

                <button
                  onClick={() => dispatch(addToCart(pizza))}
                  className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detail View Modal */}
      {selectedPizza && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedPizza(null)}
              className="absolute top-3 right-4 text-2xl font-bold text-red-500"
            >
              ×
            </button>

            <img
              src={selectedPizza.image}
              alt={selectedPizza.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h2 className="text-3xl font-bold mt-5">
              {selectedPizza.name}
            </h2>

            <p className="text-red-500 font-semibold mt-2">
              {selectedPizza.category}
            </p>

            <p className="text-gray-600 mt-3">
              {selectedPizza.description}
            </p>

            <p className="text-2xl font-bold text-red-500 mt-4">
              ₹{selectedPizza.price}
            </p>

            <button
              onClick={() => {
                dispatch(addToCart(selectedPizza));
                setSelectedPizza(null);
              }}
              className="w-full mt-5 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
            >
              Add To Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;