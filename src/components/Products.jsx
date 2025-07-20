import { useEffect, useState } from 'react'
import ProductItem from './ProductItem'
import { useNavigate, useParams } from 'react-router-dom';

export default function Products() {
    const [products, setproducts] = useState([]);
    const navigate = useNavigate();
    const { category } = useParams();

    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('q');

    const fetchData = async () => {
        let url = `https://dummyjson.com/products`;
        if (category) {
            url = `https://dummyjson.com/products/category/${category}`;
        } else if (search) {
            url = `https://dummyjson.com/products/search?q=${search}`
        }

        const data = await fetch(url);
        let parsedData = await data.json();
        setproducts(parsedData.products);
    }

    useEffect(() => {
        fetchData();
    }, [category, search])

    // const addProduct = () => {
    //     fetch('https://dummyjson.com/products/add', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(newProduct)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log('Product added:', data);
    //             setproducts(prev => [...prev, data]);
    //         })
    //         .catch(err => console.error('product Error:', err));
    // };


    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen mt-10">
                {/* <button onClick={addProduct} className='border'>Add New Product</button> */}
                <h1 className="text-4xl font-bold mb-6 text-center text-black m-4">Products</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 mx-20'>
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
            </div>
        </>
    )
}
