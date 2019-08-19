const jwt = require('jsonwebtoken');
const SECRET = process.env.REACT_APP_SECRET;


const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.query.token ||
        req.headers['x-access-token'] ||
        req.cookies.token;
    if (!token) {
        res.status(401).json('Unauthorized: No token was provided');
    } else {
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                res.status(401).json('Invalid token')
            } else {
                req.email = decoded.email;
                next();
            }
        })
    }
}

module.exports = withAuth;