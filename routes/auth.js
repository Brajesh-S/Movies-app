const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validateInput = require('../middlewares/validateInput');
const errorHandler = require('../middlewares/errorHandler');

// Register
router.post('/register' , [
    body('username').isAlphanumeric().isLength({ min: 3, max: 20 }).trim().escape(),
    body('email').isEmail().trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape(),
    validateInput,
], async (req, res, next) => {
    const saltRounds = 10;

    try {
        const { username, email, password } = req.body;

        const sanitizedUsername = username.trim();
        const sanitizedEmail = email.trim();
        const sanitizedPassword = password.trim();

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(sanitizedPassword, salt);
        
        const newUser = new User({
            username: sanitizedUsername,
            email: sanitizedEmail,
            password: hashedPassword,
    });
    
    const savedUser = await newUser.save();

    const responseUser = {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email
    }

    res.status(201).json(responseUser);
    } catch (err) {
        next(err);
    }
});
// Login
router.post('/login', [
    body('email').isEmail().trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape(),
    validateInput,
], async (req, res, next) => { 
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;
            
            next(error);
            return;
        } 
        
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        
        if (!isPasswordValid) {
            const error = new Error('Invalid email or password');
            error.statusCode = 401;

            next(error);
            return;
        }
            const accessToken = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.SECRET_KEY, 
                { algorithm: 'RS256', expiresIn: "1d" }
            );

        const { password, ...info } = user._doc;

        return res.status(200).json({ ...info, accessToken });
    }catch (err) {
        console.error(err);
        next(err);
    }
});
router.use(errorHandler);
module.exports = router;
