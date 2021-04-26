const express = require("express");
const currentUser = require("../../middlewares/currentUser");
const requireAuth = require("../../middlewares/requireAuth");
const {
    signup,
    signin,
    updateMe,
    signout,
    getMe,
} = require("./userController");

const router = express.Router();

//@desc Signs up a new user and returns a jwt token
//@route POST /api/v1/users/signup
//@access Public
router.post("/signup", signup);
//@desc Signs in a user and returns a jwt token
//@route POST /api/v1/users/signin
//@access Public
router.post("/signin", signin);
//@desc Signs out a user and clears the jwt token
//@route POST /api/v1/users/signout
//@access Private
router.post("/signout", currentUser, requireAuth, signout);

//@desc Updates the current users nickname and or email
//@route PUT /api/v1/users/me/update
//@access Private
router.put("/me/update", currentUser, requireAuth, updateMe);
//@desc Gets the logged in user
//@route GET /api/v1/users/me
//@access Private
router.get("/me", currentUser, requireAuth, getMe);

module.exports = router;
