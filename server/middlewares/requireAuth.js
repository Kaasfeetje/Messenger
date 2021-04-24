const NotAuthorizedError = require("../common/errors/NotAuthorizedError");

const requireAuth = (req, res, next) => {
    if (!req.currentUser) {
        throw new NotAuthorizedError(
            "You must be logged in to do this action, please log in."
        );
    }
    next();
};

module.exports = requireAuth;
