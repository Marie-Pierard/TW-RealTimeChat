const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        //  Extract token from headers
        const token = req.headers.authorization.split(' ')[1];

        //  Check token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

        //  Check user ID
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};