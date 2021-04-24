const jwt = require("jsonwebtoken");

const currentUser = (req, res, next) => {
    if (!req.cookies.jwt) return next();

    try {
        const payload = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        req.currentUser = payload;
    } catch (err) {}
    next();
};

module.exports = currentUser;
