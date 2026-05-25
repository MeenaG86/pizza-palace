import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      const loggedUser = res.data.user || {
  name: res.data.name || email.split("@")[0],
  email: email,
};

localStorage.setItem("role", "user");
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(loggedUser));

toast.success(res.data.message || "Login Successful 🍕");
navigate("/");
      
      // Clear fields
      setEmail("");
      setPassword("");

    } catch (error) {

      console.log(error);

  toast.error(
  error.response?.data?.message ||
  "Login Failed ❌"
);

    }

  };

  return (

    <section className="min-h-screen bg-[#111] flex items-center justify-center px-6 py-20">

      <div className="w-full max-w-md bg-black text-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <h2 className="text-4xl font-bold text-center text-red-500">
          Login
        </h2>

        <p className="text-gray-400 text-center mt-3">
          Welcome back to Pizza Palace
        </p>

        {/* Form */}
        <form
          className="mt-8 space-y-5"
          onSubmit={handleLogin}
        >

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
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-[#222] border border-gray-700 focus:outline-none focus:border-red-500"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl text-lg font-semibold duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-400">

            Don't have an account?{" "}

            <span className="text-red-500 cursor-pointer hover:underline">
              Register
            </span>

          </p>

        </form>

      </div>

    </section>

  );
}

export default Login;