const mongoose = require('../connection');

const sellerSchema = new mongoose.Schema({
    sellername: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
}, {
    collection: 'sellers' 
});

const Seller = mongoose.model('Sellers', sellerSchema);

module.exports = Seller;
