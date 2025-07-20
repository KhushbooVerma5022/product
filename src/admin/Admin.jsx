import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Admin() {
    const [formData, setformData] = useState({
        username: "",
        password: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem("userData");

        if (storedData) {
            const { username, password } = JSON.parse(storedData);

            if ({ username, password }) {
                handleLogin(username, password);
            }
        }
    }, [])

    const handleLogin = (username, password) => {
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then(data => {

                if (data.id) {
                    navigate('/admin/products');
                } else {
                    throw new Error(data.message)
                }
            })
            .catch(error => alert(error.message));
    }


    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.accessToken) {
                    navigate('/admin/products');
                    sessionStorage.setItem("accessToken",data.accessToken)
                } else {
                    throw new Error(data.message)
                }
            })
            .catch(error => alert(error.message));

        sessionStorage.setItem("userData", JSON.stringify(formData));
    }

    return (
        <>
            <div className="min-h-screen bg-gray-200 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm h-[380px]">
                    <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your username"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}
