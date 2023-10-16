const path = require('path');
const fs = require('fs');
const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const errorHandler = require('../middlewares/errorHandler');
const registerRequest = require("../models/requests/registerRequest")
const loginRequest = require('../models/requests/loginRequest')

// Construct paths to RSA key files using __dirname
const privateKeyPath = path.join(__dirname, 'private.pem');
const publicKeyPath = path.join(__dirname, 'public.pem');
// Read RSA key files
const privateKey = fs.readFileSync(privateKeyPath);
const publicKey = fs.readFileSync(publicKeyPath);

// Register
router.post('/register' , registerRequest, async (req, res, next) => {
    const saltRounds = 10;

    try {
        const { username, email, password } = req.body;
        const sanitizedUsername = username.trim(),
              sanitizedEmail = email.trim(), 
              sanitizedPassword = password.trim();

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
router.post('/login', loginRequest
   
, async (req, res, next) => { 
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
            // Generate Token
            const payload = { id: user._id, isAdmin: user.isAdmin };
            const options = { algorithm: 'RS256', expiresIn: '1d' };
            const accessToken = jwt.sign(payload, privateKey, options);

             // Verify Token
        try {
            const decoded = jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] });
            console.log(decoded);
        } catch (error) {
            console.error('Token verification failed:', error.message);
            // Handle token verification failure, e.g., return an error response
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        // Send Response
        const { password, ...info } = user._doc;

        return res.status(200).json({ ...info, accessToken });
    }catch (err) {
        console.error(err);
        next(err);
    }
});
router.use(errorHandler);
module.exports = router;
