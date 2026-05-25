import { useEffect, useState } from "react";

import API from "../api/pizzaApi";

import PizzaCard from "./PizzaCard";

function Featured() {

  const [pizzas, setPizzas] = useState([]);

  const getPizzas = async () => {

    try {

      const response = await API.get("/pizzas");

      setPizzas(response.data.pizzas);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (

    <section className="bg-gray-100 py-16 px-6">

      <h2 className="text-4xl font-bold text-center text-red-500 mb-12">
        Featured Pizzas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

        {pizzas.map((pizza) => (
          <PizzaCard key={pizza._id} pizza={pizza} />
        ))}

      </div>

    </section>
  );
}

export default Featured;