const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Token required'});
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, seller) => {
        if (err) return res.status(403).json({ message: 'Invalid or expired token' });

        req.sellerId = seller.id;
        next();
    });
}

module.exports = auth;