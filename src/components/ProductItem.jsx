
export default function ProductItem({ title, image, description, price }) {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer ">
                <img
                    src={image}
                    alt="Product"
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-600 mb-4">
                        {description}
                    </p>
                    <p>Price: {price}</p>
                </div>
            </div>

        </>
    )
}
