const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")
const { body, validationResult } = require("express-validator")
const jwtSecretKey = process.env.JWT_SECRETKEY
const User = require("../models/UserModel")

router.post("/createuser", [
    body("email").isEmail(),
    body("name", "name cannot be less than 3 characters").isLength({ min: 3 }),
    body("password", "password cannot be less than 5 characters").isLength({ min: 3 })
], async (req, res) => {

    const secPassword = await bcrypt.hash(req.body.password, 10)
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }
    try {

        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPassword,
            location: req.body.location
        })
        res.json({ success: true })
    } catch (error) {
        console.log(error)
        res.json({ success: false })
    }

})

router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password', 'Password cannot be less than 5 characters').isLength({ min: 5 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { email, password } = req.body;
            const userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ success: false, message: "User doesn't exist" });
            }

            const pwdPassword = await bcrypt.compare(password, userData.password);
            if (!pwdPassword) {
                return res.status(400).json({ success: false, message: 'Wrong credentials' });
            }

            const data = {
                user: {
                    id: userData.id,
                },
            };

            const authToken = jwt.sign(data, jwtSecretKey);

            return res.status(200).json({ success: true, authToken: authToken, message: "loggedin successfully" });
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: 'Server error' });
        }
    }
);

module.exports = router;