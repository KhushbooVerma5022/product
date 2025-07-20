import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa';
import { useState } from 'react';
import { IoSearch } from "react-icons/io5";

export default function Navbar({ category }) {

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
    }

    const handleOnClick = () => {
        if (!search || search.trim() === "") {
            alert("Please enter some product")
        } else {
            navigate(`/products/search?q=${search}`)
        }
    }

    return ( 
        <>
            <nav className="bg-white shadow-md fixed top-0 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
                            <div className="flex items-center space-x-2 font-bold text-4xl">
                                <FaShoppingCart className="text-blue-600 text-3xl transform transition duration-500 ease-in-out hover:scale-110 hover:text-green-400" />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-4xl transform transition duration-500 ease-in-out hover:scale-105 hover:rotate-6">
                                    GoShopz
                                </span>
                            </div>
                        </div>

                        <div className="relative max-w-md flex border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent">
                            <input  
                                type='search'
                                placeholder='search for product...'
                                onChange={(e) => setsearch(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='w-full pl-4 pr-4 py-1 focus:outline-none' />

                            <button
                                className="px-4 py-2 cursor-pointer"
                                onClick={handleOnClick}
                            ><IoSearch /></button>
                        </div>

                        <div className="">
                            <select onChange={handleChange}>
                                <option value="" className='h-10' >Select a category</option>
                                {category.map((category, index) => {
                                    return <option key={index}>{category}</option>
                                })}

                            </select>
                        </div>

                    </div>
                </div>

                <div id="mobileMenu" className="md:hidden hidden px-4 pb-4">
                    {category.slice(0, 9).map((category, index) => {
                        return <Link key={index} to={`/${category}`} className="block py-2 text-gray-600 hover:text-blue-600 border-b-2 border-transparent transition duration-300 ease-in-out hover:border-blue-500">{category}</Link>
                    })}
                </div>
            </nav>



        </>
    )
}
