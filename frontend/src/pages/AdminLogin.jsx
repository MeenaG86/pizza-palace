import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
import { API_URL } from "../config";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch(
        "${API_URL}/api/auth/admin-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
       // clear old user login first
  localStorage.clear();

  // store admin login
  localStorage.setItem("role", "admin");
  localStorage.setItem("token", data.token);
  localStorage.setItem("adminToken", data.token);

        toast.success("Admin Login Successful");

        navigate("/dashboard");

      } else {

        toast.success(data.message);

      }

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Admin Login
        </h1>

        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default AdminLogin;