const Product = require('../database/schema/product');
const mongoose = require('mongoose');
const Cart = require('../database/schema/cart');

class CartController {
    static createCart = async (req, res) => {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        try {
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            const actualPrice = product.price;
            const discount = product.discount || 0;
            const discountedPrice = actualPrice - (actualPrice * discount / 100);

            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = new Cart({ userId, items: [], totalAmount: 0 });
            }

            const existingItem = cart.items.find(
                (item) => item.productId.toString() === productId
            );

            if (existingItem) {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.quantity * discountedPrice;
            } else {
                cart.items.push({
                    productId,
                    quantity,
                    price: actualPrice,
                    discount: discount,
                    discountedPrice: discountedPrice,
                    totalPrice: quantity * discountedPrice,
                });
            }

            cart.totalAmount = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);

            await cart.save();

            res.json({ message: 'Item added to cart', cart });
        } catch (error) {
            console.error('Cart Error:', error.message);
            res.status(500).json({ message: 'Server error' });
        }

    };

    static getCart = async (req, res) => {
        const userId = req.userId;

        try {
            const cart = await Cart.findOne({ userId }).populate('items.productId')
            if (!cart) {
                return res.json({ cart: { items: [], totalAmount: 0 } });
            }

            cart.items.map((item) => {
                item.productId.url = `${process.env.BASE_URL}${item.productId.url}`
                return item
            })
            res.json({
                message: 'Cart fetched successfully',
                cart
            });

        } catch (error) {
            res.status(500).json({ message: 'Failed to fetch cart' });
        }
    };

    static updateQuantity = async (req, res) => {
        const userId = req.userId;
        const { productId, quantity } = req.body;

        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            const item = cart.items.find(i => i.productId.toString() === productId);
            if (!item) {
                return res.status(404).json({ message: 'Item not found in cart' });
            }

            const product = await Product.findById(productId);
            const discountedPrice = product.discount
                ? product.price - (product.price * product.discount / 100)
                : product.price;

            item.quantity = quantity;
            item.totalPrice = quantity * discountedPrice;
            item.discountedPrice = discountedPrice;

            cart.totalAmount = cart.items.reduce((acc, i) => acc + i.totalPrice, 0);
            await cart.save();

            res.json({ message: 'Cart updated successfully', cart });
        } catch (error) {
            res.status(500).json({ message: 'Failed to update cart' });
        }
    };


    static removeItem = async (req, res) => {
        const userId = req.userId;
        const { productId } = req.params;

        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = cart.items.filter(item => item.productId.toString() !== productId);
            cart.totalAmount = cart.items.reduce((acc, i) => acc + i.totalPrice, 0);

            await cart.save();

            res.json({ message: 'Item removed', cart });
        } catch (error) {
            res.status(500).json({ message: 'Failed to remove item' });
        }
    };

    static clearCart = async (req, res) => {
        const userId = req.userId;

        try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found' });
            }

            cart.items = [];
            cart.totalAmount = 0;

            await cart.save();

            res.json({ message: 'Cart cleared', cart });
        } catch (error) {
            res.status(500).json({ message: 'Failed to clear cart' });
        }
    };

}

module.exports = CartController;
