import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import buildAPIUrls from "../utils/helper";

export default function CartPage() {
    const [cart, setCart] = useState(null);
    const token = localStorage.getItem("Usertoken");

    const fetchCart = async () => {
        try {
            const response = await fetch(buildAPIUrls("/cart/get"), {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data)
            setCart(data.cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQuantity = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            await fetch(buildAPIUrls(`/cart/update`), {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId, quantity: newQuantity }),
            });

            fetchCart();
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await fetch(buildAPIUrls(`/cart/remove/${productId}`), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchCart();
        } catch (error) {
            console.error("Failed to remove item:", error);
        }
    };

    const clearCart = async () => {
        try {
            await fetch(buildAPIUrls("/cart/clear"), {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            fetchCart();
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    const checkout = () => {
        alert("Order placed successfully!");
        clearCart();
    };

    if (!cart || cart.items.length === 0) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
                <Link to="/products" className="text-blue-600 hover:underline">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {cart.items.map((item) => (
                        <div key={item.productId} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.productId.url}
                                    alt={item.productId.title}
                                    className="w-20 h-20 object-contain rounded bg-gray-100"
                                />
                                <div>
                                    <h2 className="text-lg font-semibold">{item.productId.title}</h2>
                                    <p className="text-gray-600 text-sm line-through">₹{item.price.toFixed(2)}</p>
                                    <p className="text-blue-600 font-bold text-sm">₹{item.discountedPrice.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) =>
                                        updateQuantity(item.productId._id, parseInt(e.target.value))
                                    }
                                    className="w-16 border rounded px-2 py-1"
                                />
                                <button
                                    onClick={() => removeFromCart(item.productId._id)}
                                    className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-gray-100 p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                    <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₹{cart.totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                        <span>Shipping</span>
                        <span className="text-gray-500">Free</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between text-lg font-semibold">
                        <span>Total</span>
                        <span>₹{cart.totalAmount.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={checkout}
                        className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                    >
                        Place Order
                    </button>

                    <button
                        onClick={clearCart}
                        className="w-full mt-3 text-red-500 hover:underline"
                    >
                        Clear Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
