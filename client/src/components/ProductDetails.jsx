import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ProductItem from "./ProductItem";
import buildAPIUrls from "../utils/helper";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setproduct] = useState({});
    const [category, setcategory] = useState("");
    const [productCategory, setproductCategory] = useState("");
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ rating: 1, comment: "" });
    const [quantity, setQuantity] = useState(1);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    useEffect(() => {
        fetch(buildAPIUrls(`/products/${id}`))
            .then((res) => res.json())
            .then((data) => {
                setproduct(data);
                setcategory(data.category);
            });
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    useEffect(() => {
        if (category) {
            fetch(buildAPIUrls(`/products/category/${category}`))
                .then((res) => res.json())
                .then((data) => setproductCategory(data));
        }
    }, [category]);

    const { products = [] } = productCategory;

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const url = buildAPIUrls(`/reviews/${id}`);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`Failed to fetch reviews: ${response.status}`);
                }

                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error.message);
            }
        };

        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = localStorage.getItem("username");

        if (!username) {
            console.error("User is not logged in");
            return;
        }

        const newReview = {
            productId: id,
            username: username,
            rating: form.rating,
            comment: form.comment,
        };

        let url = buildAPIUrls("/review/create");

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            const result = await response.json();
            setReviews([result, ...reviews]);
            setForm({ rating: 1, comment: "" });
            console.log("Review submitted successfully:", result);
        } catch (error) {
            console.error("Error submitting review:", error.message);
        }
    };

    const addToCart = async () => {
        const token = localStorage.getItem('Usertoken');

        if (!token) {
            alert('You must be logged in to add items to your cart!');
            return;
        }

        const cartData = {
            productId: id,
            quantity: quantity,
        };

        try {
            let url = buildAPIUrls('/cart/add')
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(cartData),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Product added to cart');
                navigate('/cart')
            } else {
                alert(result.message || 'Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
            alert('Error adding product to cart');
        }
    };


    return (
        <>
            <div className="max-w-screen-lg mx-auto mt-20 p-8 sm:p-4 border border-gray-200 shadow-lg rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative space-y-4">
                        <img
                            src={product.url}
                            alt={product.title}
                            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-contain rounded-lg shadow-md"
                        />

                        <button
                            className="px-6 py-2 bg-violet-500 text-white rounded-md"
                            onClick={addToCart}
                        >
                            Add To Cart
                        </button>
                    </div>

                    <div className="flex flex-col justify-between">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{product.title}</h1>
                        <p className="text-lg font-medium text-gray-500 mb-4">{product.description}</p>

                        <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center">
                                {product.discount ? (
                                    <>
                                        <span className="text-sm text-red-500 line-through mr-2">{product.price}</span>
                                        <span className="text-lg font-bold text-blue-600">
                                            {(product.price - (product.price * (product.discount / 100))).toFixed(2)}
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm text-red-500 mr-2">{product.price}</span>
                                )}
                            </div>
                        </div>

                        <p className="text-sm text-gray-600">{product.warrantyInformation}</p>
                        <p className="text-sm text-gray-600 mb-6">{product.shippingInformation}</p>

                        {/* Reviews Section */}
                        <div className="border-t border-gray-200 pt-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>

                            <form onSubmit={handleSubmit} className="mb-6">
                                <div className="mb-4">
                                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Rating</label>
                                    <div className="flex items-center space-x-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <FaStar
                                                key={rating}
                                                onClick={() => setForm({ ...form, rating })}
                                                className={`cursor-pointer ${form.rating >= rating ? "text-yellow-500" : "text-gray-300"
                                                    }`}
                                                size={24}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Comment</label>
                                    <textarea
                                        id="comment"
                                        name="comment"
                                        value={form.comment}
                                        onChange={handleInputChange}
                                        required
                                        rows="4"
                                        className="w-full px-4 py-2 text-gray-700 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 border-b-2 border-gray-300"
                                        placeholder="Add your comment here..."
                                    />
                                </div>

                                <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md">Submit Review</button>
                            </form>

                            <div className="max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                                {reviews.map((review) => (
                                    <div key={review._id} className="mb-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <div className="w-8 h-8 bg-blue-500 text-white text-center rounded-full flex items-center justify-center">
                                                {review.username ? review.username[0].toUpperCase() : "U"}
                                            </div>
                                            <span className="font-semibold text-gray-800">{review.username}</span>
                                            <div className="flex items-center ml-2 text-yellow-500">
                                                {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                                            </div>
                                        </div>
                                        <p className="text-gray-800 mb-2">{review.comment}</p>
                                        <small className="text-gray-500">{new Date(review.createdAt).toLocaleString()}</small>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="max-w-screen-lg mx-auto mt-10">
                <h1 className="font-semibold text-2xl mb-5">Similar Products</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                            <ProductItem
                                key={product.id}
                                title={product.title}
                                url={product.url}
                                description={product.description}
                                price={product.price}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
