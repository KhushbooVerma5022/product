import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setproduct] = useState("")

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then(data => setproduct(data))
    }, [id])

    return (
        <>
            <div className="max-w-screen-lg mx-auto mt-20 p-4 border border-gray-100 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-auto object-cover rounded-lg hover:shadow-lg"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                        <p className="text-md font-semibold text-blue-500 mb-6">{product.description}</p>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                {product.discountPercentage ? (
                                    <>
                                        <span className="text-sm text-red-500 line-through mr-2">{product.price}</span>
                                        <span className="text-lg font-bold text-blue-600">{(product.price - (product.price * (product.discountPercentage / 100))).toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className="text-sm text-red-500 mr-2">{product.price}</span>
                                )}
                            </div>

                            <div className="flex items-center">
                                {
                                    Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
                            </div>
                        </div>

                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-md text-gray-800 font-semibold" >{product.warrantyInformation}</span>
                            <span className="text-lg text-gray-800 font-semibold">{product.availabilityStatus}</span>
                        </div>

                        <div className="mt-2">
                            <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>
                            {product.reviews?.length === 0 ? (
                                <p className="text-gray-500">No reviews yet.</p>
                            ) : (
                                product.reviews?.map((review, idx) => (
                                    <div key={idx}  className="max-h-64 overflow-y-auto pr-2 space-y-3">
                                        <div className="border-b pb-2 ">
                                            <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-800">~{review.reviewerName}</span>
                                            <span>
                                                <div className="flex items-center gap-1 rounded-md mt-4 px-2 py-1 bg-[rgb(14,30,241)] text-white w-12">
                                                    <span className="text-white text-sm"><FaStar /></span>
                                                    <span className="text-white text-sm font-bold">{review.rating}</span>
                                                </div>
                                            </span>
                                            </div>
                                            <p className="text-sm text-gray-700">{review.comment}</p>
                                        </div>
                                    </div>

                                ))
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
