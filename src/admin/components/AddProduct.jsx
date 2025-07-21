import { useState } from "react"

export default function AddProduct() {
    const [formData, setformData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        tags: "",
        brand: "",
        sku: "",
        warrantyInformation: "",
        shippingInformation: "",
        minimumOrderQuantity: "",
        images: ""
    })

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(console.log);
    }

    return (
        <>
                <div className="max-w-4xl mx-auto p-6">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-700 text-center mb-6">Add New Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-6 bg-white border p-6 rounded-xl border-gray-300 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Title</label>
                                <input
                                    name="title"
                                    type="text"
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
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter stock quantity"
                                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                            </div>

                            <div className="col-span-1">
                                <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags</label>
                                <input
                                    name="tags"
                                    type="text"
                                    onChange={handleChange}
                                    placeholder="Enter product tags"
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
                                onChange={handleChange}
                                placeholder="Enter minimum order quantity"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Product Image URL</label>
                            <input
                                name="images"
                                type="url"
                                onChange={handleChange}
                                placeholder="Enter product image URL"
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="flex justify-center mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            >
                                Submit Product
                            </button>
                        </div>
                    </form>
                </div>
        </>
    )
}
