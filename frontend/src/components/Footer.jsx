function Footer() {
  return (

    <footer className="bg-black text-white pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>

            <h2 className="text-3xl font-bold text-red-500">
              Pizza Palace
            </h2>

            <p className="text-gray-400 mt-4 leading-7">
              Fresh ingredients, delicious pizzas, and fast delivery
              to make every meal special.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li className="hover:text-red-500 duration-300 cursor-pointer">
                Home
              </li>

              <li className="hover:text-red-500 duration-300 cursor-pointer">
                Menu
              </li>

              <li className="hover:text-red-500 duration-300 cursor-pointer">
                About
              </li>

              <li className="hover:text-red-500 duration-300 cursor-pointer">
                Contact
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>📍 Hyderabad, India</p>

              <p>📞 +91 9876543210</p>

              <p>✉️ pizzapalace@gmail.com</p>

            </div>

          </div>

          {/* Opening Hours */}
          <div>

            <h3 className="text-2xl font-semibold mb-5">
              Opening Hours
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>Monday - Friday</p>

              <p>10:00 AM - 11:00 PM</p>

              <p>Saturday - Sunday</p>

              <p>11:00 AM - 12:00 AM</p>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500">

          <p>
            © 2026 Pizza Palace. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>

  );
}

export default Footer;