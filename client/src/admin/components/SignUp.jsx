import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SellerNavbar from '../SellerNavbar';
import buildAPIUrls from '../../utils/helper';

function SignUp() {
    const [sellerData, setsellerData] = useState({
        sellername: '',
        password: '',
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setsellerData({
            ...sellerData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let url = buildAPIUrls('/admin/create');

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sellerData),
        })

            .then(response => {
                if (!response.ok) throw new Error("Network response was not OK");
                return response.json();
            })
            .then(result => {
                console.log(result);
                navigate('/admin/signIn');
            })
    }

    return (
        <>
        <SellerNavbar/>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 px-4">
                <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
                    
                    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-b from-indigo-600 to-purple-600 text-white p-8 w-1/2">
                        <h2 className="text-3xl font-bold mb-4">"Turn Your Passion into Profit"</h2>
                        <p className="text-lg text-center">
                            Every great business starts with one step. Let SellerZone help you take it.
                        </p>
                    </div>

                    <div className="p-8 w-full md:w-1/2">
                        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                            Create Account
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label htmlFor="sellername" className="block text-sm font-medium text-gray-700">
                                    Sellername
                                </label>
                                <input
                                    type="text"
                                    name="sellername"
                                    value={sellerData.sellername}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your sellername"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    value={sellerData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SignUp