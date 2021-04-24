const CustomError = require("./CustomError");

class NotAuthorizedError extends CustomError {
    statusCode = 401;
    message;

    constructor(message) {
        super(message);
        this.message = message;
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors() {
        return { message: this.message };
    }
}

module.exports = NotAuthorizedError;
