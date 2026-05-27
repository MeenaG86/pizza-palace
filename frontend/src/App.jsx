import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile";
import Checkout from "./pages/Checkout"
import ManagePizzas from "./pages/admin/ManagePizzas"
import ManageOrders from "./pages/admin/ManageOrders"
import PizzaDetails from "./pages/PizzaDetails";
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import MyOrders from "./pages/MyOrder"
import AdminPanel from "./pages/AdminPanel"
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/protected/ProtectedRoute";

import AdminRoute from "./components/protected/AdminRoute";





function App(){

  return(

    <BrowserRouter>
    <Navbar />
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/pizza/:id" element={<PizzaDetails />} />

        <Route path="/cart" element={<ProtectedRoute> <Cart /></ProtectedRoute>}/>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/my-orders" element={<ProtectedRoute><MyOrders/></ProtectedRoute>}/>

        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />

        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/admin-login" element={<AdminLogin />} />

        <Route path="/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        <Route path="/admin/pizzas" element={<AdminRoute><ManagePizzas /></AdminRoute>} />

        <Route path="/admin/orders" element={<AdminRoute><ManageOrders /></AdminRoute>} />

        

      </Routes>
      <Footer />
    </BrowserRouter>

  )

}

export default App