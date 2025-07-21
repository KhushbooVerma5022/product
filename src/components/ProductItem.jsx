
export default function ProductItem({ title, image, description, price }) {
    return (
        <>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto">
                <div className="w-full h-30 sm:h-48">
                    <img
                        src={image}
                        alt="Product"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="p-2 sm:p-4">
                    <h2 className="text-sm sm:text-xl md:text-2xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 md:mb-4 hidden sm:block">
                        {description}
                    </p>
                    <p className="text-sm text-base sm:text-lg font-medium">Price: {price}</p>
                </div>
            </div>

        </>
    )
}
