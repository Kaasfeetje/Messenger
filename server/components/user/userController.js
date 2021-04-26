const jwt = require("jsonwebtoken");
const User = require("./userModel");
const BadRequestError = require("../../common/errors/BadRequestError");
const Password = require("../../common/Password");

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

const signin = async (req, res) => {
    const { usernameorEmail, password } = req.body;

    if (!usernameorEmail || !password)
        throw new BadRequestError(
            "Please provide an email or username and a password"
        );

    const validEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        usernameorEmail
    );

    let user;
    if (!validEmail) {
        //case insensitve unique search
        user = await User.where(
            "username",
            new RegExp("^" + usernameorEmail + "$", "i")
        );
        user = user[0];
    } else {
        user = await User.findOne({ email: usernameorEmail.toLowerCase() });
    }
    if (!user) throw new BadRequestError("Invalid credentials");

    const isCorrectPassword = await Password.compare(user.password, password);
    if (!isCorrectPassword) throw new BadRequestError("Invalid credentials");

    const token = signToken({
        email: user.email,
        username: user.username,
        id: user.id,
        nickname: user.nickname,
    });

    res.status(200).cookie("jwt", token).send({ data: user });
};

const signout = async (req, res) => {
    res.status(200).clearCookie("jwt").send({});
};

const updateMe = async (req, res) => {
    const user = await User.findById(req.currentUser.id);

    const { nickname, email } = req.body;

    user.nickname = nickname || user.nickname;
    user.email = email || user.email;

    const updatedUser = await user.save();

    res.status(200).send({ data: updatedUser });
};

const getMe = async (req, res) => {
    const user = await User.findById(req.currentUser.id);

    res.status(200).send({ data: user });
};

module.exports = { signup, signin, signout, updateMe, getMe };
