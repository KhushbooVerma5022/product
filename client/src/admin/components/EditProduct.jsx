import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedFile, setselectedFile] = useState('')
    const [preview, setpreview] = useState('')

    const [product, setproduct] = useState({
        title: "",
        description: "",
        category: "",
        price: 0,
        stock: 0,
        discount: 0,
        brand: "",
        sku: "",
        warrantyInformation: "",
        shippingInformation: "",
        minimumOrderQuantity: 0,
        file: ""
    })

    useEffect(() => {
        fetch(`http://localhost:2000/products/${id}`)
            .then(res => res.json())
            .then(data => setproduct(data))
    }, [id])

    const handleChange = (e) => {
        setproduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setselectedFile(file);
            setpreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem('token');

        let url = `http://localhost:2000/products/${id}`;

        const formData = new FormData();
        formData.append('title', product.title);
        formData.append('description', product.description);
        formData.append('category', product.category);
        formData.append('price', product.price);
        formData.append('stock', product.stock);
        formData.append('discount', product.discount);
        formData.append('brand', product.brand);
        formData.append('sku', product.sku);
        formData.append('warrantyInformation', product.warrantyInformation);
        formData.append('shippingInformation', product.shippingInformation);
        formData.append('minimumOrderQuantity', product.minimumOrderQuantity);
        formData.append('file', selectedFile);

        fetch(url, {
            method: 'PUT',
            body: formData,
        })
            .then(response => {
                if (!response.ok) throw new Error("Network response was not OK");
                return response.json();
            })
            .then(result => {
                setselectedFile(null);
                setpreview(null);
                navigate('/admin/products')
            })
            .catch(error => {
                console.log('error:', error);
            });
    };


    return (
        <>
            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-lg sm:text-xl md:text-2xl  font-bold text-teal-700 text-center mb-6">Update Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6 bg-white border p-6 rounded-xl border-gray-300 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                            <input
                                name="title"
                                type="text"
                                value={product.title}
                                onChange={handleChange}
                                required
                                placeholder="Enter product title"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                                placeholder="Enter product description"
                                rows="4"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            ></textarea>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <input
                                name="category"
                                type="text"
                                value={product.category}
                                onChange={handleChange}
                                placeholder="Enter product category"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input
                                name="price"
                                type="number"
                                required
                                value={product.price}
                                onChange={handleChange}
                                placeholder="Enter product price"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
                            <input
                                name="stock"
                                type="number"
                                value={product.stock}
                                onChange={handleChange}
                                required
                                placeholder="Enter stock quantity"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount</label>
                            <input
                                name="discount"
                                type="number"
                                value={product.discount}
                                onChange={handleChange}
                                placeholder="Enter product discount"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand</label>
                            <input
                                name="brand"
                                type="text"
                                value={product.brand || ""}
                                onChange={handleChange}
                                placeholder="Enter product brand"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="col-span-1">
                            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">SKU</label>
                            <input
                                name="sku"
                                type="text"
                                value={product.sku}
                                onChange={handleChange}
                                placeholder="Enter product SKU"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="warranty" className="block text-sm font-medium text-gray-700">Warranty Information</label>
                        <input
                            name="warrantyInformation"
                            type="text"
                            value={product.warrantyInformation}
                            onChange={handleChange}
                            placeholder="Enter product warranty info"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="shipping" className="block text-sm font-medium text-gray-700">Shipping Information</label>
                        <input
                            name="shippingInformation"
                            type="text"
                            value={product.shippingInformation}
                            onChange={handleChange}
                            placeholder="Enter product shipping info"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="minimumOrder" className="block text-sm font-medium text-gray-700">Minimum Order Quantity</label>
                        <input
                            name="minimumOrderQuantity"
                            type="number"
                            value={product.minimumOrderQuantity}
                            onChange={handleChange}
                            placeholder="Enter minimum order quantity"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                    </div>


                    <div className="max-w-md mx-auto p-6 bg-white/30 backdrop-blur-lg rounded-xl shadow-lg border border-white/20">
                        <label
                            htmlFor="file"
                            className="block text-lg font-medium text-gray-800 mb-3"
                        >
                            Upload Image
                        </label>

                        <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 hover:border-blue-400 transition-colors">
                            <input
                                type="file"
                                id="file"
                                name="file"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="text-center text-gray-500 pointer-events-none">
                                Drag and drop or click to upload
                            </div>
                        </div>

                        {preview && (
                            <div className="mt-6">
                                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="rounded-lg shadow-md border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white cursor-pointer font-semibold rounded-lg shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
