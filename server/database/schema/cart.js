const mongoose = require('../connection');

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',  
            required: true,
        },
        items: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
                quantity: { type: Number, default: 1 },
                price: { type: Number, required: true },            
                discount: { type: Number, default: 0 },            
                discountedPrice: { type: Number, required: true }, 
                totalPrice: { type: Number, required: true },      
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', cartSchema);