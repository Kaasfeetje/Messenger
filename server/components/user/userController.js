const jwt = require("jsonwebtoken");
const User = require("./userModel");
const BadRequestError = require("../../common/errors/BadRequestError");

const signToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const signup = async (req, res) => {
    const { username, nickname, email, password } = req.body;

    if (!username || !email || !password)
        throw new BadRequestError(
            "Please provide an email, username and password"
        );

    const user = new User({ username, nickname, email, password });
    await user.save();

    const token = signToken({
        email: user.email,
        username: user.username,
        id: user.id,
        nickname: user.nickname,
    });

    res.status(201).cookie("jwt", token).send({ data: user });
};

module.exports = { signup };
