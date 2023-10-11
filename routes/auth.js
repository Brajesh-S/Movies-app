const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register
router.post('/register', async (req, res) => {
    const saltRounds = 10;

    try {
        const { username, email, password } = req.body;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        const newUser = new User({
            username,
            email,
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
        console.error(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});
// Login
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        
        if (!user) {
            return res.status(401).json('Invalid email or password');
        } 
        
        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json('Invalid email or password');
        }
            const accessToken = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.SECRET_KEY, 
                { expiresIn: "50d" }
            );

        const { password, ...info } = user._doc;

        return res.status(200).json({ ...info, accessToken });
    }catch (err) {
        console.error(err);
        return res.status(500).json(err);
    }
});

module.exports = router;
