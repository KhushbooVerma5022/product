import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearch, IoAdd } from "react-icons/io5";

const ProductList = () => {
    const [products, setproducts] = useState([])
    const [search, setsearch] = useState("")
    const [category, setcategory] = useState([])
    const [selectedCategory, setselectedCategory] = useState("")
    const [showConfirm, setShowConfirm] = useState(false);
    const [productId, setproductId] = useState(null)
    const [skip, setskip] = useState(0);
    const [totalProducts, settotalProducts] = useState(0);

    const navigate = useNavigate();

    const fetchData = async () => {
        let url = `https://dummyjson.com/products?limit=10&skip=${skip}`;
        if (search) {
            url = `https://dummyjson.com/products/search?q=${search}`
        } else if (selectedCategory) {
            url = `https://dummyjson.com/products/category/${selectedCategory}`
        }

        const data = await fetch(url);
        let parsedData = await data.json();
        setproducts(parsedData.products);
        settotalProducts(parsedData.total)
    }

    const productCategory = async () => {
        let url = 'https://dummyjson.com/products/category-list';
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
    }, [])

    useEffect(() => {
        fetchData();
    }, [selectedCategory, skip])
    

    const handleDelete = (id) => {
        fetch(`https://dummyjson.com/products/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
    }

    const handlePrevClick = () => {
        setskip((prevSkip) => {
            if (prevSkip > 0) return prevSkip - 10;
            return 0;
        });
    }

    const handleNextClick = () => {
        setskip((prevSkip) => {
            return prevSkip + 10
        });
    }

    return (
        <>
            <div className="max-w-6xl mx-auto px-4 mt-2">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">Products List</h2>
                <div className="overflow-x-auto border border-g ray-500 rounded-lg p-3">
                    <div className="w-full gap-5 sm:gap-18 mb-3 flex">
                        <div className="w-48 h-10 sm:h-full md:w-1/3 flex items-center bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-950 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-300">
                            <input
                                type="search"
                                id="simple-search"
                                value={search}
                                onChange={(e) => setsearch(e.target.value)}
                                className="block w-full  md:py-2 md:pl-10 md:pr-2 focus:outline-none"
                                placeholder="Search..."
                                onKeyDown={handleKeyDown}
                            />
                            <button
                                className="md:px-4 md:py-2 cursor-pointer"
                                onClick={handleSearch}
                            ><IoSearch /></button>
                        </div>

                        <div className="w-full md:w-1/3 ">
                            <select
                                onChange={handleChange}
                                value={selectedCategory}
                                className='py-2 pl-4 pr-2 w-full bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-950 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-300'>
                                <option value="" className='h-10' >Select a category</option>
                                {category.map((category, index) => {
                                    return <option key={index}>{category}</option>
                                })}
                            </select>
                        </div>

                        <button
                            className="flex items-center bg-green-700 h-9 text-[10px] md:text-[14px] lg:text-[16px]  hover:bg-green-600 cursor-pointer text-white font-semibold p-1 p-4 sm:px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300"
                            onClick={() => navigate("/admin/addProduct")}
                        >
                            <IoAdd className="sm:mr-2" /> Add Product
                        </button>
                    </div>

                    <table className="min-w-full bg-white auto">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400 text-left">ID</th>
                                <th className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400 text-left">Title</th>
                                <th className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400 text-left">Price</th>
                                <th className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400 text-left">Category</th>
                                <th className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400">{product.id}</td>
                                    <td className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400">{product.title}</td>
                                    <td className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400">${product.price}</td>
                                    <td className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400">{product.category}</td>
                                    <td className="py-[3px] px-2 sm:py-[5px] sm:px-4 text-sm sm:text-md border-b border-gray-400 sm:space-x-2 space-y-1">
                                        <button
                                            onClick={() => navigate(`/admin/editProduct/${product.id}`)}
                                            className="bg-lime-800 hover:bg-lime-600 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-sm cursor-pointer"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowConfirm(true);
                                                setproductId(product.id);
                                            }}
                                            className="bg-teal-800 hover:bg-teal-700 text-white px-2 sm:px-3 py-1 rounded text-[10px] sm:text-sm cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='container flex justify-between mt-2'>
                    <button type='button' disabled={skip === 0} onClick={handlePrevClick} className='bg-gray-600 text-white text-[8px] md:text-[12px] px-1  md:px-2 md:pb-1 rounded-sm cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed' >&larr; Previous</button>
                    <button type='button' disabled={skip + 10 >= totalProducts} onClick={handleNextClick} className='bg-gray-600 text-white text-[8px] md:text-[12px] px-1  md:px-2 md:pb-1 rounded-sm cursor-pointer disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed' >next &rarr;</button>
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
