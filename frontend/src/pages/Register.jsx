import axios from "axios";
import { useState } from "react";
import {toast} from "react-toastify"
import { API_URL } from "../config";
function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    // Password validation
    if (password !== confirmPassword) {
      toast.success("Passwords do not match");
      return;
    }

    try {

      const res = await axios.post(
        `${API_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );

      toast.success(res.data.message);

      // Clear form after success
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

    } catch (error) {

      console.log(error);

      toast.success(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (

    <section className="min-h-screen bg-[#111] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-md bg-black text-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-red-500">
          Register
        </h2>

        <p className="text-gray-400 text-center mt-3">
          Create your Pizza Palace account
        </p>

        {/* Form */}
        <form
          className="mt-8 space-y-5"
          onSubmit={handleRegister}
        >

          {/* Name */}
          <div>

            <label className="block mb-2 text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-red-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>

          {/* Email */}
          <div>

            <label className="block mb-2 text-gray-300">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="block mb-2 text-gray-300">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          {/* Confirm Password */}
          <div>

            <label className="block mb-2 text-gray-300">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-red-500"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl text-lg font-semibold duration-300"
          >
            Register
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-400">

            Already have an account?{" "}

            <span className="text-red-500 cursor-pointer hover:underline">
              Login
            </span>

          </p>

        </form>

      </div>

    </section>

  );

}

export default Register;