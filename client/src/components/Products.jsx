import { useEffect, useState } from 'react';
import ProductItem from './ProductItem';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const navigate = useNavigate();
    const { category } = useParams();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('q');
    const limit = 15;

    const fetchData = async () => {
        let url = `http://localhost:2000/products?limit=${limit}&page=${page}`;

        if (category) {
            url = `http://localhost:2000/products/category/${category}?limit=${limit}&page=${page}`;
        } else if (search) {
            url = `http://localhost:2000/products/search?title=${search}&limit=${limit}&page=${page}`;
        }

        try {
            const res = await fetch(url);
            const parsedData = await res.json();
            setProducts(parsedData.products);
            setTotalProducts(parsedData.totalProducts);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        }
    };

    useEffect(() => {
        setPage(1); 
    }, [category, search]);

    useEffect(() => {
        fetchData();
    }, [category, search, page]);

    const totalPages = Math.ceil(totalProducts / limit);

    const handlePrevClick = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleNextClick = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="pt-6 bg-gray-100 min-h-screen mt-10">
            <h1 className="text-2xl font-semibold sm:text-4xl sm:font-bold mb-6 text-center text-black m-4">Products</h1>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-20 sm:mx-20 mx-10'>
                {products.map((product) => (
                    <div key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                        <ProductItem
                            title={product.title}
                            url={product.url}
                            description={product.description}
                            price={product.price}
                        />
                    </div>
                ))}
            </div>

            {totalProducts > 0 && (
                <div className="container mx-auto px-4 mt-4 mb-4">
                    <div className="flex items-center justify-between bg-white p-3 rounded-md shadow-sm">

                        <button
                            type="button"
                            disabled={page === 1}
                            onClick={handlePrevClick}
                            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                        >
                            &larr; Previous
                        </button>

                        <span className="text-gray-600 text-sm font-medium">
                            Page {page} of {totalPages || 1}
                        </span>

                        <button
                            type="button"
                            disabled={page >= totalPages}
                            onClick={handleNextClick}
                            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                        >
                            Next &rarr;
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
}
