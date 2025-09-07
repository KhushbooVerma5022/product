const Review = require('../database/schema/review');

class ReviewController {

    static getReview = async (req, res) => {
        try {
            const reviews = await Review.find({ productId: req.params.productId }).sort({ createdAt: -1 });
            res.json(reviews);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static createReview = async (req, res) => {
        const { productId, rating, comment, username } = req.body;

        const logo = username.charAt(0).toUpperCase();

        const review = new Review({
            productId,
            username,
            logo,
            rating,
            comment,
        });

        try {
            const savedReview = await review.save();
            res.status(201).json(savedReview);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = ReviewController;