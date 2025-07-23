import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { useNavigate, useParams } from 'react-router-dom';

export default function Products() {
    const [products, setproducts] = useState([]);
    const [skip, setskip] = useState(0);
    const [totalProducts, settotalProducts] = useState(0);
    const navigate = useNavigate();
    const { category } = useParams();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('q');

    const fetchData = async () => {
        let url = `https://dummyjson.com/products?limit=20&skip=${skip}`;
        if (category) {
            url = `https://dummyjson.com/products/category/${category}`;
        } else if (search) {
            url = `https://dummyjson.com/products/search?q=${search}`
        }

        const data = await fetch(url);
        let parsedData = await data.json();
        setproducts(parsedData.products);
        settotalProducts(parsedData.total)
    }

    useEffect(() => {
        fetchData();
    }, [category, search, skip])

    const handlePrevClick = () => {
        setskip((prevSkip) => {
            const newSkip = prevSkip > 0 ? prevSkip - 20 : 0;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return newSkip;
        });
    }

    const handleNextClick = () => {
        setskip((prevSkip) => {
            const newSkip = prevSkip + 20;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return newSkip;
        });
    }


    return (
        <>
            <div className="pt-6 bg-gray-100 min-h-screen mt-10">
                <h1 className="text-2xl font-semibold sm:text-4xl sm:font-bold mb-6 text-center text-black m-4">Products</h1>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-20 sm:mx-20 mx-10'>
                    {products.map((product) => {
                        return (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/products/category/${product.id}`)}
                            >
                                <ProductItem
                                    key={product.id}
                                    title={product.title}
                                    image={product.images}
                                    description={product.description}
                                    price={product.price} />
                            </div>
                        )
                    })}
                </div>
                <div className="container mx-auto px-4 mt-4 mb-4">
                    <div className="flex items-center justify-between bg-white p-3">
                        
                        <button
                            type="button"
                            disabled={skip === 0}
                            onClick={handlePrevClick}
                            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md shadow-sm hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                        >
                            &larr; Previous
                        </button>

                        <span className="text-gray-600 text-sm font-medium">
                            Page {Math.floor(skip / 20) + 1} of {Math.ceil(totalProducts / 20)}
                        </span>

                        <button
                            type="button"
                            disabled={skip + 20 >= totalProducts}
                            onClick={handleNextClick}
                            className="bg-gray-700 text-white text-sm px-4 py-2 rounded-md shadow-sm hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed transition"
                        >
                            Next &rarr;
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}
