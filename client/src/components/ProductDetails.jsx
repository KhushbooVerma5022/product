import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { FaStar } from "react-icons/fa";
import ProductItem from "./ProductItem";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setproduct] = useState("");
    const [category, setcategory] = useState("");
    const [productCategory, setproductCategory] = useState("");

    useEffect(() => {
        fetch(`http://localhost:2000/api/products/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setproduct(data)
                setcategory(data.category)
            })
        window.scrollTo({ top: 0, behavior: 'smooth' });

    }, [id])

    useEffect(() => {
        if (category) {
            fetch(`http://localhost:2000/api/products/products/category/${category}`)
                .then(res => res.json())
                .then(data => setproductCategory(data));
        }
    }, [category]);


    const { products = [] } = productCategory;

    return (
        <>
            <div className="max-w-screen-lg mx-auto mt-20 p-8 sm:p-4 border border-gray-100 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                        <img
                            src={product.url}
                            alt={product.title}
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain rounded-lg hover:shadow-lg"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
                        <p className="text-md font-semibold text-blue-500 mb-6 ">{product.description}</p>
                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                {product.discount ? (
                                    <>
                                        <span className="text-sm text-red-500 line-through mr-2">{product.price}</span>
                                        <span className="text-lg font-bold text-blue-600">{(product.price - (product.price * (product.discount / 100))).toFixed(2)}</span>
                                    </>
                                ) : (
                                    <span className="text-sm text-red-500 mr-2">{product.price}</span>
                                )}
                            </div>

                            {/* <div className="flex items-center">
                                {
                                    Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                                        <FaStar key={i} className="text-yellow-400" />
                                    ))}
                                <span className="text-gray-500 text-sm ml-2">({product.rating})</span>
                            </div> */}
                        </div>

                        <p className="text-md text-gray-800 font-semibold" >{product.warrantyInformation}</p>
                        <p className="text-md text-gray-800 font-semibold">{product.shippingInformation}</p>


                        {/* <div className="mt-2">
                            <h2 className="text-2xl font-semibold mb-3">Customer Reviews</h2>
                            {product.reviews?.length === 0 ? (
                                <p className="text-gray-500">No reviews yet.</p>
                            ) : (
                                product.reviews?.map((review, idx) => (
                                    <div key={idx} className="max-h-64 overflow-y-auto pr-2 space-y-3">
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
                        </div> */}

                    </div>
                </div>
            </div>
            <div className="max-w-screen-lg mx-auto mt-10 ">
                <h1 className="font-bold text-sm sm:text-2xl mb-5 ml-5 md:ml-0">Similar Products For You</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-20 sm:mx-0 mx-5'>
                    {products.map((product) => {
                        return (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                <ProductItem
                                    key={product.id}
                                    title={product.title}
                                    url={product.url}
                                    description={product.description}
                                    price={product.price} />
                            </div>
                        )
                    })}
                </div>
            </div >

        </>
    )
}
