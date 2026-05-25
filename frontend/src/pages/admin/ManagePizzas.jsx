import { useEffect, useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

function ManagePizzas() {

  const [pizzas, setPizzas] = useState([]);

  const [form, setForm] = useState({
    name: "",
    category:"",
    description: "",
    price: "",
    image: "",
  });

  const [editId, setEditId] = useState(null);

  const API = "http://localhost:5000/api/pizzas";

  // FETCH PIZZAS
  const fetchPizzas = async () => {

    try {

      const res = await axios.get(API);

      setPizzas(res.data.pizzas);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchPizzas();

  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // ADD / UPDATE
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };

    if (editId) {
      await axios.put(`${API}/${editId}`, form, config);

      toast.success("Pizza Updated Successfully");
      setEditId(null);
    } else {
      await axios.post(`${API}/add`, form, config);

      toast.success("Pizza Added Successfully");
    }

    setForm({
      name: "",
      category: "",
      description: "",
      price: "",
      image: "",
    });

    fetchPizzas();
  } catch (error) {
    console.log(error);

    toast.success(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

  // EDIT
  const handleEdit = (pizza) => {

    setEditId(pizza._id);

    setForm({
      name: pizza.name,
      category:pizza.category,
      description: pizza.description,
      price: pizza.price,
      image: pizza.image,
    });

  };

  // DELETE
  const handleDelete = async (id) => {

    try {

      await axios.delete(`${API}/${id}`);

      toast.success("Pizza Deleted Successfully");

      fetchPizzas();

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen bg-gray-100 pt-28 px-6">

      <h1 className="text-4xl font-bold text-center mb-10">
        Manage Pizzas
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow mb-10"
      >

        <input
          type="text"
          name="name"
          placeholder="Pizza Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />
        <input
  type="text"
  name="category"
  placeholder="Category"
  value={form.category}
  onChange={handleChange}
  className="w-full border p-3 mb-4 rounded"
  required
/>

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-3 mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded"
        >
          {editId ? "Update Pizza" : "Add Pizza"}
        </button>

      </form>

      {/* PIZZA LIST */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {pizzas.map((pizza) => (

          <div
            key={pizza._id}
            className="bg-white rounded-xl shadow p-5"
          >

            <img
              src={pizza.image}
              alt={pizza.name}
              className="w-full h-48 object-cover rounded"
            />

            <h2 className="text-2xl font-bold mt-4">
              {pizza.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {pizza.description}
            </p>

            <p className="text-xl font-bold mt-3">
              ₹{pizza.price}
            </p>

            <div className="flex gap-3 mt-5">

              <button
                onClick={() => handleEdit(pizza)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(pizza._id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ManagePizzas;