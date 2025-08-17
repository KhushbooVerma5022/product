const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
       return res.status(401).json({message: 'Token required'});
    }

    jwt.verify(token, process.env.JWT_SECRET_USER, (err, user) => {
        if(err) return res.status(403).json({message: 'Invalid or expired token'});

        req.userId = user.id;
        next();
    } )

}

module.exports = authUser;