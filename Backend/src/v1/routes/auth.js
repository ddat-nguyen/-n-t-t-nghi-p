const { body } = require("express-validator");
const {validate} = require('../middleware/validate');
const {register, login} = require('../controllers/auth');
const User = require("../models/user");
const router = require('express').Router();

router.post(
    "/signup",
    body("username")
        .isLength({ min: 6 })
        .withMessage("Username must be at least 8 characters long"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
        }
        return true;
    }),
    body("email").custom(async (value) => {
        return await User.findOne({ email: value }).then((user) => {
            if (user) {
                return Promise.reject("Email already in use");
            }
        });
    }),
    validate,
    register
);

router.post(
    "/login",
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
    validate,
    login
);


module.exports = router;