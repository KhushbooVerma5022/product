const { mongo } = require('mongoose');
const Product = require('../database/schema/product');

class DashboardController {
    static getProducts = async (req, res) => {
        const sellerId = req.sellerId;
        console.log(sellerId)
        try {
            const productCountByCategory = await Product.aggregate([
                {
                    $match: { sellerId: new mongo.ObjectId(sellerId) } 
                },
                {
                    $group: {
                        _id: "$category",        
                        count: { $sum: 1 }      
                    }
                },
                {
                    $project: {
                        _id: 0,                 
                        category: "$_id",       
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