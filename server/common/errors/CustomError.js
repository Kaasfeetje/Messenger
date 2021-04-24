class CustomError extends Error {
    statusCode;
    message;

    constructor(message) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
    }

    serializeErrors() {}
}

module.exports = CustomError;
