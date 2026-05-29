import Featured from "../components/Featured"
import Hero from "../components/Hero"
import Navbar from "../components/Navbar"
import About from "../components/About"
import { Navigate } from "react-router-dom"


function Home() {
  const role = localStorage.getItem("role");

  if (role === "admin") {
    return <Navigate to="/dashboard" />;
  }


  return (

    <div>
      <Hero />
      <Featured />
      <About />

    </div>

  )

}

export default Home