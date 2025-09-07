const Product = require('../database/schema/product');

class ProductController {
    static getProducts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const totalProducts = await Product.countDocuments();
            const product = await Product.find()
                .skip((page - 1) * limit)
                .limit(limit);

            const totalPages = Math.ceil(totalProducts / limit);

            const formattedProducts = product.map((product) => {
                return {
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    discount: product.discount,
                    brand: product.brand,
                    sku: product.sku,
                    warrantyInformation: product.warrantyInformation,
                    shippingInformation: product.shippingInformation,
                    minimumOrderQuantity: product.minimumOrderQuantity,
                    url: `${process.env.BASE_URL}${product.url}`
                }
            })

            res.json({
                products: formattedProducts,
                totalProducts,
                totalPages,
                currentPage: page,
                perPage: limit,
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static getProductsBySeller = async (req, res) => {
        const sellerId = req.sellerId;
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const totalProducts = await Product.countDocuments({ sellerId: sellerId });
            const product = await Product.find({ sellerId: sellerId })
                .skip((page - 1) * limit)
                .limit(limit)
                .sort({
                    '_id': -1
                });

            const totalPages = Math.ceil(totalProducts / limit);

            const formatted = product.map((products) => ({
                sellerId: sellerId,
                id: products._id,
                title: products.title,
                description: products.description,
                category: products.category,
                price: products.price,
                stock: products.stock,
                discount: products.discount,
                brand: products.brand,
                sku: products.sku,
                warrantyInformation: products.warrantyInformation,
                shippingInformation: products.shippingInformation,
                minimumOrderQuantity: products.minimumOrderQuantity,
                url: `${process.env.BASE_URL}${products.url}`
            }))

            res.json({
                products: formatted,
                totalProducts,
                totalPages,
                currentPage: page,
                perPage: limit,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static createProduct = async (req, res) => {

        try {
            const sellerId = req.sellerId;
            const data = req.body;
            const filePath = req.file ? '/public/images/' + req.file.filename : '';

            const newProduct = new Product({
                sellerId: sellerId,
                title: data.title,
                description: data.description,
                category: data.category,
                price: data.price,
                stock: data.stock,
                discount: data.discount,
                brand: data.brand,
                sku: data.sku,
                warrantyInformation: data.warrantyInformation,
                shippingInformation: data.shippingInformation,
                minimumOrderQuantity: data.minimumOrderQuantity,
                url: filePath,
            })

            const savedProduct = await newProduct.save();
            res.json(savedProduct);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static updateProduct = async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            )

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' })
            }
            res.json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static getProductById = async (req, res) => {
        const { id } = req.params;

        try {
            const product = await Product.findById(id)
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
            }
            const formattedProducts = {
                id: product._id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                brand: product.brand,
                sku: product.sku,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                minimumOrderQuantity: product.minimumOrderQuantity,
                url: `${process.env.BASE_URL}${product.url}`
            }

            res.json(formattedProducts);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static deleteProduct = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedProduct = await Product.findByIdAndDelete(id);

            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' })
            }

            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static getCategoryList = async (req, res) => {
        try {
            const categories = await Product.distinct('category');
            res.json(categories);

        } catch (error) {
            console.log("inside catch", error)
            res.status(500).json({ message: error.message });
        }
    }

    static getProductByCategory = async (req, res) => {
        const { category } = req.params;

        try {
            const products = await Product.find({
                category: category
            })

            if (!category) {
                return res.status(404).json({ message: 'Product not found' })
            }

            const formattedProducts = products.map(product => {
                return {
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    discount: product.discount,
                    brand: product.brand,
                    sku: product.sku,
                    warrantyInformation: product.warrantyInformation,
                    shippingInformation: product.shippingInformation,
                    minimumOrderQuantity: product.minimumOrderQuantity,
                    url: `${process.env.BASE_URL}${product.url}`,
                }
            })

            res.json({products: formattedProducts});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static getProductByCategorySeller = async (req, res) => {
        const sellerId = req.sellerId;
        const { category } = req.params;

        if (!category) {
            return res.status(400).json({ message: 'Category is required' });
        }

        try {
            const products = await Product.find({
                sellerId,
                category
            });

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found for this category' });
            }

            const formattedProducts = products.map(product => {
                return {
                    sellerId: sellerId,
                    id: product._id,
                    title: product.title,
                    description: product.description,
                    category: product.category,
                    price: product.price,
                    stock: product.stock,
                    discount: product.discount,
                    brand: product.brand,
                    sku: product.sku,
                    warrantyInformation: product.warrantyInformation,
                    shippingInformation: product.shippingInformation,
                    minimumOrderQuantity: product.minimumOrderQuantity,
                    url: `${process.env.BASE_URL}${product.url}`,
                }
            });

            res.json({products: formattedProducts});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };

    static searchProductsByAdmin = async (req, res) => {
        const { title } = req.query;
        const adminId = req.sellerId; // assuming the admin ID is stored in the request after authentication

        let query = { sellerId: adminId }; // search only products that belong to this admin
        if (title && title.trim()) {
            query.title = { $regex: title, $options: 'i' };
        }

        try {
            const products = await Product.find(query).exec();

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found matching your criteria' });
            }

            const formattedProducts = products.map(product => ({
                sellerId: product.sellerId,
                id: product._id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                brand: product.brand,
                sku: product.sku,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                minimumOrderQuantity: product.minimumOrderQuantity,
                url: `${process.env.BASE_URL}${product.url}`,
            }));

            return res.status(200).json({products: formattedProducts});

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };

    static searchProducts = async (req, res) => {
        const { title } = req.query;

        let query = {}
        if (title && title.trim()) {
            query.title = { $regex: title, $options: 'i' };
        }

        try {
            const products = await Product.find(query).exec();

            if (products.length === 0) {
                return res.status(404).json({ message: 'No products found matching your criteria' });
            }

            const formattedProducts = products.map(product => ({
                sellerId: product.sellerId,
                id: product._id,
                title: product.title,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock,
                discount: product.discount,
                brand: product.brand,
                sku: product.sku,
                warrantyInformation: product.warrantyInformation,
                shippingInformation: product.shippingInformation,
                minimumOrderQuantity: product.minimumOrderQuantity,
                url: `${process.env.BASE_URL}${product.url}`,
            }));

            return res.status(200).json({products:formattedProducts});

        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }


}

module.exports = ProductController