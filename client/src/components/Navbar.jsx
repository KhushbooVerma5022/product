import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { IoSearch, IoMenu, IoClose } from 'react-icons/io5';

export default function Navbar({ category }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [search, setsearch] = useState("");
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleOnClick();
        }
    }

    const handleChange = (e) => {
        const selectedCategory = e.target.value;
        navigate(`/product/${selectedCategory}`);
        setMobileMenuOpen(false);
    }

    const handleOnClick = () => {
        if (!search || search.trim() === "") {
            alert("Please enter some product");
        } else {
            navigate(`/products/search?q=${search}`);
        }
        setMobileMenuOpen(false);
    }

    const username = localStorage.getItem('username');
    const userInitial = username ? username.charAt(0).toUpperCase() : null;

    return (
        <>
            <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2 font-bold text-2xl text-blue-600">
                            <FaShoppingCart className="text-blue-600 text-3xl transition-transform duration-300 hover:scale-110 hover:text-green-400" />
                            <span
                                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-2xl sm:text-3xl md:text-4xl transition duration-500 hover:scale-105 hover:rotate-6 cursor-pointer"
                                onClick={() => navigate('/')}
                            >
                                GoShopz
                            </span>
                        </div>

                        <div className="hidden md:flex items-center space-x-4">
                            <div className="relative border border-gray-300 rounded-lg shadow-sm">
                                <input
                                    type="search"
                                    placeholder="Search for product..."
                                    onChange={(e) => setsearch(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-64 pl-4 pr-4 py-2 rounded-l-lg focus:outline-none"
                                />
                                <button
                                    className="px-4 py-2 rounded-r-lg bg-gray-100 hover:bg-gray-200"
                                    onClick={handleOnClick}
                                >
                                    <IoSearch />
                                </button>
                            </div>

                            <select
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md py-2 px-3"
                            >
                                <option value="">Select a category</option>
                                {category.map((cat, idx) => (
                                    <option key={idx}>{cat}</option>
                                ))}
                            </select>

                            {username ? (
                                <div className="flex items-center space-x-4 mx-4">
                                    <button
                                        onClick={() => navigate('/cart')}
                                        className="text-2xl text-gray-700 hover:text-blue-600 transition"
                                        title="Go to Cart"
                                    >
                                        <FaShoppingCart />
                                    </button>

                                    <div
                                        className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-semibold text-lg"
                                        title={username}
                                    >
                                        {userInitial}
                                    </div>

                                    <button
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate('/user');
                                        }}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="font-semibold py-2 px-4 transition duration-200 hover:font-bold hover:text-blue-500 cursor-pointer mx-4"
                                    onClick={() => navigate('/user')}
                                >
                                    Login
                                </button>
                            )}

                            <button
                                onClick={() => navigate(`/sellerhub`)}
                                className="bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Become a Seller
                            </button>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-3xl focus:outline-none"
                            >
                                {mobileMenuOpen ? <IoClose /> : <IoMenu />}
                            </button>
                        </div>
                    </div>

                    {mobileMenuOpen && (
                        <div className="md:hidden px-4 pb-4 space-y-2 bg-white shadow-md">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <input
                                    type="search"
                                    placeholder="Search..."
                                    onChange={(e) => setsearch(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full pl-4 py-2 focus:outline-none"
                                />
                                <button
                                    className="px-4 py-2"
                                    onClick={handleOnClick}
                                >
                                    <IoSearch />
                                </button>
                            </div>

                            <select
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-md py-2 px-3"
                            >
                                <option value="">Select a category</option>
                                {category.map((cat, idx) => (
                                    <option key={idx}>{cat}</option>
                                ))}
                            </select>

                            {username && (
                                <button
                                    onClick={() => {
                                        navigate('/cart');
                                        setMobileMenuOpen(false);
                                    }}
                                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 w-full"
                                >
                                    <FaShoppingCart />
                                    <span>View Cart</span>
                                </button>
                            )}

                            {username ? (
                                <div className="flex items-center justify-between w-full px-2">
                                    <div
                                        className="bg-blue-600 text-white w-9 h-9 rounded-full flex items-center justify-center font-semibold text-lg"
                                        title={username}
                                    >
                                        {userInitial}
                                    </div>
                                    <button
                                        onClick={() => {
                                            localStorage.clear();
                                            navigate('/user');
                                            setMobileMenuOpen(false);
                                        }}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="font-semibold py-2 px-4 transition duration-200 hover:font-bold hover:text-blue-500 cursor-pointer w-full"
                                    onClick={() => {
                                        navigate('/user');
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    Login
                                </button>
                            )}

                            <button
                                onClick={() => navigate(`/admin`)}
                                className="bg-slate-600 w-full hover:bg-slate-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                            >
                                Become a Seller
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
