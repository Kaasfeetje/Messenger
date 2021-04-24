const CustomError = require("../common/errors/CustomError");

const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res
            .status(err.statusCode)
            .send({ error: err.serializeErrors() });
    }

    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }

    res.status(500).send({ error: { message: "Something went wrong." } });
};

module.exports = errorHandler;
