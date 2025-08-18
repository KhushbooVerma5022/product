import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import buildAPIUrls from '../../utils/helper';

const ProductList = () => {
    const [products, setproducts] = useState([])
    const [search, setsearch] = useState("")
    const [category, setcategory] = useState([])
    const [selectedCategory, setselectedCategory] = useState("")
    const [showConfirm, setShowConfirm] = useState(false);
    const [productId, setproductId] = useState(null)
    const [page, setpage] = useState(1);
    const [totalProducts, settotalProducts] = useState(0);

    const navigate = useNavigate();
    const limit = 10;
    const hasNextPage = products.length === limit;

    const fetchData = async () => {
        const token = sessionStorage.getItem('token');
        let url = buildAPIUrls(`/seller/products?limit=${limit}&page=${page}`);

        if (selectedCategory) {
            url = buildAPIUrls(`/seller/products/${selectedCategory}`);
        }
        else if (search) {
            url = buildAPIUrls(`/seller/products/search?title=${search}`);
        }

        try {
            const res = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch products');
            }

            if (page > 1 && data.products.length === 0) {
                setpage((prev) => Math.max(prev - 1, 1));
                return;
            }
            setproducts(data.products);
            settotalProducts(data.totalProducts)            

        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };


    const productCategory = async () => {
        let url = buildAPIUrls('/products/category-list');
        const data = await fetch(url);
        let parsedData = await data.json();
        setcategory(parsedData)
    }

    const handleChange = (e) => {
        const selected = e.target.value;
        setselectedCategory(selected);
    }

    const handleSearch = () => {
        if (!search || search.trim() === "") {
            alert("Please enter some product")
        } else {
            fetchData();
            setsearch("");
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        fetchData();
        productCategory();
    }, [selectedCategory, page, search])

    const handleDelete = async (id) => {
        try {
            const res = await fetch(buildAPIUrls(`/products/${id}`), {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                fetchData();
            } else {
                console.error("Failed to delete:", data.message);
            }

        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };


    const handlePrevClick = () => {
        setpage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextClick = () => {
        const totalPages = Math.ceil(totalProducts / limit);
        setpage((prevPage) => Math.min(prevPage + 1, totalPages));
    };


    return (
        <>
            <div className="max-w-6xl mx-auto px-4 mt-2">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Products List</h2>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-5 mb-4">
                    <div className="flex w-full sm:w-auto items-center bg-gray-100 border border-gray-300 rounded-lg px-3 py-2">
                        <input
                            type="search"
                            id="simple-search"
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full bg-transparent text-sm focus:outline-none"
                            placeholder="Search..."
                        />
                        <button
                            onClick={handleSearch}
                            className="ml-2 text-gray-600 hover:text-gray-800"
                        >
                            <IoSearch />
                        </button>
                    </div>

                    <div className="w-full sm:w-56">
                        <select
                            onChange={handleChange}
                            value={selectedCategory}
                            className="w-full bg-gray-100 border border-gray-300 rounded-lg text-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select a category</option>
                            {category.map((cat, index) => (
                                <option key={index}>{cat}</option>
                            ))}
                        </select>
                    </div>

                </div>

                <div className="overflow-x-auto border border-gray-300 rounded-lg">
                    <table className="min-w-full bg-white text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-2 px-3 text-left">ID</th>
                                <th className="py-2 px-3 text-left">Title</th>
                                <th className="py-2 px-3 text-left">Price</th>
                                <th className="py-2 px-3 text-left">Category</th>
                                <th className="py-2 px-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t hover:bg-gray-50">
                                    <td className="py-2 px-3">{product.id}</td>
                                    <td className="py-2 px-3">{product.title}</td>
                                    <td className="py-2 px-3">${product.price}</td>
                                    <td className="py-2 px-3">{product.category}</td>
                                    <td className="py-2 px-3 flex flex-col sm:flex-row gap-2">
                                        <button
                                            onClick={() => navigate(`/admin/editProduct/${product.id}`)}
                                            className="bg-lime-700 hover:bg-lime-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowConfirm(true);
                                                setproductId(product.id);
                                            }}
                                            className="bg-teal-700 hover:bg-teal-600 text-white px-3 py-1 rounded text-xs"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded shadow-sm">
                    <button
                        type="button"
                        disabled={page === 1}
                        onClick={handlePrevClick}
                        className="bg-gray-700 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                    >
                        &larr; Previous
                    </button>

                    <span className="text-gray-600 text-sm font-medium">
                        Page {page} of {Math.ceil(totalProducts / limit)}
                    </span>

                    <button
                        type="button"
                        disabled={!hasNextPage || page >= Math.ceil(totalProducts / limit)}
                        onClick={handleNextClick}
                        className="bg-gray-700 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                    >
                        Next &rarr;
                    </button>
                </div>

            </div>


            {showConfirm && (
                <div className="fixed inset-0 bg-opacity-100 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm mx-auto">
                        <h2 className="text-lg font-bold mb-4 text-red-600">Delete Product?</h2>
                        <p className="mb-6 text-gray-700">Are you sure you want to delete this product?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(false);
                                    handleDelete(productId);
                                }}
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductList;
