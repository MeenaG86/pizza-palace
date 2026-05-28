function Admin() {
  return (

    <section className="min-h-screen bg-[#111] text-white flex">

      {/* Sidebar */}
      <div className="w-72 bg-black p-6 hidden lg:block">

        {/* Logo */}
        <h2 className="text-3xl font-bold text-red-500 mb-12">
          Pizza Palace
        </h2>

        {/* Menu */}
        <ul className="space-y-5 text-lg">

          <li className="bg-red-500 px-5 py-3 rounded-xl cursor-pointer">
            Dashboard
          </li>

          <li className="hover:bg-[#222] px-5 py-3 rounded-xl cursor-pointer duration-300">
            Add Pizza
          </li>

          <li className="hover:bg-[#222] px-5 py-3 rounded-xl cursor-pointer duration-300">
            Orders
          </li>

          <li className="hover:bg-[#222] px-5 py-3 rounded-xl cursor-pointer duration-300">
            Users
          </li>

          <li className="hover:bg-[#222] px-5 py-3 rounded-xl cursor-pointer duration-300">
            Logout
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-5 mt-10">

          <h1 className="text-4xl font-bold ">
            Admin Dashboard
          </h1>

          <button className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl duration-300">

            Add New Pizza

          </button>

        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

          {/* Card 1 */}
          <div className="bg-black rounded-2xl p-6">

            <h3 className="text-gray-400 text-lg">
              Total Orders
            </h3>

            <p className="text-4xl font-bold mt-4 text-red-500">
              120
            </p>

          </div>

          {/* Card 2 */}
          <div className="bg-black rounded-2xl p-6">

            <h3 className="text-gray-400 text-lg">
              Total Revenue
            </h3>

            <p className="text-4xl font-bold mt-4 text-red-500">
              ₹45K
            </p>

          </div>

          {/* Card 3 */}
          <div className="bg-black rounded-2xl p-6">

            <h3 className="text-gray-400 text-lg">
              Total Users
            </h3>

            <p className="text-4xl font-bold mt-4 text-red-500">
              340
            </p>

          </div>

          {/* Card 4 */}
          <div className="bg-black rounded-2xl p-6">

            <h3 className="text-gray-400 text-lg">
              Total Pizzas
            </h3>

            <p className="text-4xl font-bold mt-4 text-red-500">
              25
            </p>

          </div>

        </div>

        {/* Recent Orders */}
        <div className="bg-black rounded-2xl p-6 mt-12 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-8">
            Recent Orders
          </h2>

          <table className="w-full min-w-175px">

            <thead>

              <tr className="border-b border-gray-700 text-left">

                <th className="pb-4">Order ID</th>

                <th className="pb-4">Customer</th>

                <th className="pb-4">Pizza</th>

                <th className="pb-4">Amount</th>

                <th className="pb-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {/* Row 1 */}
              <tr className="border-b border-gray-800">

                <td className="py-5">#PP101</td>

                <td className="py-5">Rahul</td>

                <td className="py-5">Cheese Burst Pizza</td>

                <td className="py-5">₹599</td>

                <td className="py-5">

                  <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg">

                    Preparing

                  </span>

                </td>

              </tr>

              {/* Row 2 */}
              <tr className="border-b border-gray-800">

                <td className="py-5">#PP102</td>

                <td className="py-5">Priya</td>

                <td className="py-5">Pepperoni Pizza</td>

                <td className="py-5">₹899</td>

                <td className="py-5">

                  <span className="bg-green-500 text-black px-4 py-2 rounded-lg">

                    Delivered

                  </span>

                </td>

              </tr>

              {/* Row 3 */}
              <tr className="border-b border-gray-800">

                <td className="py-5">#PP103</td>

                <td className="py-5">Amit</td>

                <td className="py-5">Veggie Pizza</td>

                <td className="py-5">₹499</td>

                <td className="py-5">

                  <span className="bg-red-500 text-white px-4 py-2 rounded-lg">

                    Cancelled

                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </section>

  );
}

export default Admin;