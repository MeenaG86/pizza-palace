import {Link} from "react-router-dom";
function Hero() {
    return (
        <section className="bg-[#fff8f0] min-h-[90vh] pt-20 md:pt-16 relative z-10" >
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid md:grid-cols-2 items-center min-h-[90vh] gap-10">
                    <div>

                        <p className="text-red-600 font-semibold text-lg text-center md:text-left mb-3">

                            Hot & Fresh Pizza

                        </p>

                        <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900 text-center md:text-left">

                            FAST DELIVERY <br />

                            WITH BEST QUALITY

                        </h1>

                        <p className="text-gray-600 text-lg mt-6 leading-8">

                            Fresh ingredients, authentic taste, and
                            lightning-fast delivery right to your door.

                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 mt-8">
                           <Link to="/menu">
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full text-lg font-semibold duration-300">

                                Order Now

                            </button>
                            </Link>
                            <Link to="/menu">
                            <button className="border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold duration-300">

                                View Menu

                            </button>
                          </Link>
                        </div>

                    </div>
                    <div className="relative flex justify-center">

                        <img
                            src="https://images.unsplash.com/photo-1513104890138-7c749659a591"
                            alt="pizza"
                            className="w-full max-w-75px md:max-w-150px rounded-full"
                        />
                        <div className="absolute top-10 right-10 z-20 bg-red-600 text-white w-20 h-20 md:w-28 md:h-28 rounded-full flex flex-col justify-center items-center shadow-xl">

                            <span className="text-sm">

                                UP TO

                            </span>

                            <span className="text-3xl font-bold">

                                50%

                            </span>

                            <span className="text-sm">

                                OFF

                            </span>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Hero