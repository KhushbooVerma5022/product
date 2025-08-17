const { mongo } = require('mongoose');
const Product = require('../database/schema/product');

class DashboardController {
    static getProducts = async (req, res) => {
        const sellerId = req.sellerId;
        console.log(sellerId)
        try {
            const productCountByCategory = await Product.aggregate([
                {
                    $match: { sellerId: new mongo.ObjectId(sellerId) } // filter by sellerId first
                },
                {
                    $group: {
                        _id: "$category",        // group by category field
                        count: { $sum: 1 }       // count documents
                    }
                },
                {
                    $project: {
                        _id: 0,                  // remove _id field
                        category: "$_id",        // rename _id to category
                        count: 1
                    }
                },
            ]);

            res.json({
                status: true,
                data: productCountByCategory
            })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = DashboardController