const { json } = require('express');
const Seller = require('../database/schema/seller');
const jwt = require('jsonwebtoken');

class SellerController {

    static getSellers = async (req, res) => {
        try {
            const sellers = await Seller.find();
            res.json(sellers);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static sellerLogin = async (req, res) => {
        const data = req.body;        

        try {
            const seller = await Seller.findOne({
                sellername: data.sellername,
                password: data.password,
            })

            if (!seller) {
                return res.status(401).json({ message: 'Seller not Found' });
            }

            const token = jwt.sign(
                { id: seller.id, sellername: seller.sellername },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            )

            res.status(200).json({
                message: 'Login successful',
                sellername: seller.sellername,
                token: token
            })

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static createSeller = async (req, res) => {
        const data = req.body
        try {
            const seller = new Seller({
                sellername: data.sellername,
                password: data.password
            })
            await seller.save();
            res.json(seller);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static getSellerById = async (req, res) => {
        const sellerId = req.sellerId;
        console.log(sellerId);
        
        try {
            const seller = await Seller.findById(sellerId)
            if (!seller) {
                res.status(404).json({ message: 'Seller not found' });
            }
            res.json(seller);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static updateSeller = async (req, res) => {
        const { id } = req.params;
        const data = req.body;

        try {
            const updatedSeller = await Seller.findByIdAndUpdate(
                id,
                data,
                {
                    new: true,
                    runValidators: true
                }
            )

            if (!updatedSeller) {
                return res.status(404).json({ message: 'Seller not found' })
            }
            res.json(updatedSeller);
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static deleteSeller = async (req, res) => {
        const { id } = req.params;

        try {
            const deletedSeller = await Seller.findByIdAndDelete(id);

            if (!deletedSeller) {
                return res.status(404).json({ message: 'Seller not found' })
            }

            res.json({ message: "Seller deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

module.exports = SellerController;