import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SellerNavbar from '../SellerNavbar';

export default function SignIn() {
    const [formData, setformData] = useState({
        sellername: "",
        password: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = sessionStorage.getItem("sellerData");

        if (storedData) {
            const { sellername, password } = JSON.parse(storedData);

            if ( sellername && password ) {
                handleLogin(sellername, password);
            }
        }
    }, [])

    const handleLogin = (sellername, password) => {
        fetch('http://localhost:2000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sellername, password })
        })
            .then(res => res.json())
            .then(data => {

                if (data.token) {
                    sessionStorage.setItem("token", data.token);
                    navigate('/admin/dashboard');

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

        fetch('http://localhost:2000/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {

                if (data.token) {
                    sessionStorage.setItem("token", data.token)
                    navigate('/admin/dashboard');
                } else {
                    throw new Error(data.message)
                }
            })
            .catch(error => alert(error.message));

        sessionStorage.setItem("sellerData", JSON.stringify(formData));
    }

    return (
        <>
            <SellerNavbar />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-4">
                <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.02]">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Admin Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="sellername" className="block text-sm font-medium text-gray-700">
                                Sellername
                            </label>
                            <input
                                type="text"
                                name="sellername"
                                value={formData.sellername}
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
                                value={formData.password}
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
                            Login
                        </button>
                    </form>
                </div>
            </div>

        </>
    )
}
