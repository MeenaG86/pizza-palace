import {Link} from "react-router-dom"
import ScrollToTop from "./ScrollToTop";
function About() {
  return (
    
    <section className="bg-black text-white py-20 px-6">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Side Image */}
        <div>
          <img
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop"
            alt="Pizza"
            className="rounded-2xl w-full h-100px object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div>

          <h2 className="text-4xl md:text-5xl font-bold">
            About Pizza Palace
          </h2>

          <p className="text-gray-300 mt-6 text-lg leading-8">
            At Pizza Palace, we make delicious pizzas using fresh ingredients,
            handmade dough, and premium cheese. Our mission is to deliver
            unforgettable taste and happiness in every slice.
          </p>

          <p className="text-gray-400 mt-4 text-lg leading-8">
            From classic Margherita to loaded Cheese Burst pizzas, we serve
            quality food with passion and love.
          </p>
            <Link to="/menu" onClick={<ScrollToTop/>}>
          <button className="mt-8 bg-red-500 hover:bg-red-600 px-8 py-4 rounded-xl text-lg font-semibold duration-300">
            Explore Menu
          </button>
          </Link>

        </div>

      </div>

    </section>
  );
}

export default About;