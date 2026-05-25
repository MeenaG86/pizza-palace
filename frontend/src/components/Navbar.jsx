import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
 // CART STATE
  const cartItems = useSelector(
    (state) => state.cart.cartItems
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("adminToken");

  const isAdmin = role === "admin" && (token || adminToken);
  const isUser = role === "user" && token;
  const isLoggedIn = isAdmin || isUser;

  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user =
      storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
  } catch (error) {
    user = null;
  }

  const username = isAdmin
    ? "Admin"
    : user?.name || user?.email || "User";

  const handleLogout = () => {
    localStorage.clear();

    if (isAdmin) {
      navigate("/admin-login");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-3xl font-bold text-red-500">
          Pizza Palace
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-lg font-medium">

          {isAdmin ? (
            <>
              <Link to="/dashboard" className="hover:text-red-500">
                Dashboard
              </Link>

              <Link to="/admin/pizzas" className="hover:text-red-500">
                Manage Pizzas
              </Link>

              <Link to="/admin/orders" className="hover:text-red-500">
                Manage Orders
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-red-500">
                Home
              </Link>

              <Link to="/menu" className="hover:text-red-500">
                Menu
              </Link>

              <Link to="/my-orders" className="hover:text-red-500">
                My Orders
              </Link>

              <Link to="/cart" className="hover:text-red-500">
                Cart({cartCount})

              </Link>
            </>
          )}

        </div>

        {/* Right Side Desktop */}
        <div className="hidden md:flex items-center gap-4 text-lg font-medium">

          {isLoggedIn ? (
            <>
              <span className="hover:text-red-500 cursor-pointer">
                Hi {username}
              </span>

              <button
                onClick={handleLogout}
                className="hover:text-red-500 cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-red-500">
                Login
              </Link>

              <Link to="/register" className="hover:text-red-500">
                Register
              </Link>

              
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-black px-6 py-6 flex flex-col gap-5 text-lg font-medium">

          {isAdmin ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>

              <Link to="/admin/pizzas" onClick={() => setMenuOpen(false)}>
                Manage Pizzas
              </Link>

              <Link to="/admin/orders" onClick={() => setMenuOpen(false)}>
                Manage Orders
              </Link>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              <Link to="/menu" onClick={() => setMenuOpen(false)}>
                Menu
              </Link>

              <Link to="/my-orders" onClick={() => setMenuOpen(false)}>
                My Orders
              </Link>

              <Link to="/cart" onClick={() => setMenuOpen(false)}>
                Cart({cartCount})

              </Link>
            </>
          )}

          <hr className="border-gray-700" />

          {isLoggedIn ? (
            <>
              <span>
                Hi {username}
              </span>

              <button
                onClick={handleLogout}
                className="text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>

              <Link to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </Link>

              
            </>
          )}

        </div>
      )}
    </nav>
  );
}

export default Navbar;