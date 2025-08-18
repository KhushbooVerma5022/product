import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = isSignup
            ? {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmPassword
            }
            : {
                username: formData.username,
                password: formData.password,
            };

        const url = isSignup
            ? 'http://localhost:2000/api/products/user/signup'
            : 'http://localhost:2000/api/products/user/login';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const result = await response.json();

            if (response.ok) {
                const token = result.token;                

                if (isSignup) {
                    alert('Account created successfully! You can now log in.');
                    navigate('/');

                } else {
                    localStorage.setItem('Usertoken', token);
                    localStorage.setItem('username', result.username);
                    navigate('/');
                }

            } else {
                console.error('Error:', result);
            }

        } catch (error) {
            console.error('Network error:', error);
        }

    };


    const toggleForm = () => {
        setIsSignup(!isSignup);
    };

    return (
        <div className="relative">
            <div className="h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://via.placeholder.com/1500x800')" }}>
                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div className="absolute inset-0 flex justify-center items-center text-white z-10">
                    <div className="w-full max-w-md p-8 bg-white bg-opacity-80 rounded-xl shadow-xl">
                        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
                            {isSignup ? 'Create Account' : 'Log In'}
                        </h2>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-4">
                                <label htmlFor="username" className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 mt-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Choose a username"
                                />
                            </div>

                            {isSignup && (
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {isSignup && (
                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Confirm your password"
                                    />
                                </div>
                            )}

                            <div className="mb-4">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
                                >
                                    {isSignup ? 'Sign Up' : 'Log In'}
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    {isSignup ? 'Already have an account? ' : "Don't have an account? "}
                                    <button
                                        type="button"
                                        onClick={toggleForm}
                                        className="text-blue-600 hover:underline"
                                    >
                                        {isSignup ? 'Log In' : 'Sign Up'}
                                    </button>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center bg-gray-800 py-8">
                <p className="text-white text-xl font-semibold italic text-center max-w-3xl">
                    "The best way to predict the future is to create it. Shop with us, and make your dreams come true!"
                </p>
            </div>
        </div>
    );
}
