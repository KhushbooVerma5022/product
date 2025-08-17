import React from 'react'
import SellerNavbar from './SellerNavbar'

const Admin = () => {
    return (
        <>
            <SellerNavbar />
            <div className="bg-gray-50 min-h-screen">
                <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                Welcome to <span className="text-yellow-300">SellerZone</span>
                            </h1>
                            <p className="mt-4 text-lg">
                                "Your products deserve the spotlight — let’s put them there."
                            </p>
                            <button className="mt-6 px-6 py-3 bg-yellow-300 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition">
                                Start Selling Now
                            </button>
                        </div>

                        <div className="flex-1">
                            <img
                                src="https://dokan.co/app/uploads/2023/05/How-to-Become-an-eCommerce-Seller-7-Tips-from-Experts.png"
                                alt="Selling products"
                                className="rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-6 py-16">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        Why Join SellerZone?
                    </h2>
                    <p className="text-center text-gray-500 mt-2">
                        "Success is not in selling more, it's in selling smarter."
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mt-10">
                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <img
                                src="https://images.freeimages.com/cme/images/previews/99c/global-business-around-the-world-30564.jpg"
                                alt="Global Reach"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <h3 className="mt-4 text-xl font-semibold">Global Reach</h3>
                            <p className="text-gray-600 mt-2">
                                Expand your business worldwide and reach millions of customers.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ96fO6E27RBspf3wMA4gmw0wz_n3zbIsUSDQ&s"
                                alt="Secure Payments"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <h3 className="mt-4 text-xl font-semibold">Secure Payments</h3>
                            <p className="text-gray-600 mt-2">
                                Reliable and fast transactions to keep your business running.
                            </p>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition">
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkrWyCxda20ze2umZl1m8ibTOpqt-Ds7x9dQ&s"
                                alt="Analytics"
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <h3 className="mt-4 text-xl font-semibold">Smart Analytics</h3>
                            <p className="text-gray-600 mt-2">
                                Track your sales performance and optimize for growth.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="bg-gradient-to-r from-purple-600 to-blue-600 py-12">
                    <h2 className="text-center text-2xl md:text-3xl text-white font-semibold">
                        "Every big seller once started with just one product."
                    </h2>
                </section>
            </div>
        </>
    )
}

export default Admin