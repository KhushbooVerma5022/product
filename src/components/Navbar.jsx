import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { IoSearch, IoMenu, IoClose } from 'react-icons/io5';

export default function Navbar({ category }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


    const [search, setsearch] = useState("")
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleOnClick();
        }
    }

    const handleChange = (e) => {
        const selectedCategory = e.target.value;
        navigate(`/products/${selectedCategory}`);
        setMobileMenuOpen(false);
    }

    const handleOnClick = () => {
        if (!search || search.trim() === "") {
            alert("Please enter some product")
        } else {
            navigate(`/products/search?q=${search}`)
        }
        setMobileMenuOpen(false);
    }

    return (
        <>
            <nav className="bg-white shadow-md fixed top-0 z-50 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2 font-bold text-2xl text-blue-600">
                            <FaShoppingCart className="text-blue-600 text-3xl transition-transform duration-300 hover:scale-110 hover:text-green-400" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-2xl sm:text-3xl md:text-4xl transition duration-500 hover:scale-105 hover:rotate-6">
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

                            <button onClick={() => navigate(`/admin`)} className='bg-green-700 h-9 text-[10px] md:text-[14px] lg:text-[16px]  hover:bg-green-600 cursor-pointer text-white font-semibold p-1 p-4 sm:px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300'>
                                Admin
                            </button>

                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="text-3xl focus:outline-none"
                            >
                                {mobileMenuOpen ? <IoClose /> : <IoMenu />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
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
                    </div>
                )}
            </nav>
        </>
    )
}
