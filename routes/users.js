const router = require('express').Router();
const { body } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const verify = require('../verifyToken');
const validateInput = require('../middlewares/validateInput');
const errorHandler = require('../middlewares/errorHandler'); 

//Update User
router.put('/:id', verify, [
    body('username').isAlphanumeric().isLength({ min: 3, max: 20 }).trim().escape(),
    body('email').isEmail().trim().escape()
    .custom(async (value) => {
        // Checks if the email already exists in the database
        const existingUser = await User.findOne({ email: value });
        if (existingUser) {
          throw new Error('Email address is already in use');
        }
        return true;
      }),
    body('password').isLength({ min: 6 }).trim().escape(),
    validateInput,
], async (req, res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
        
                if (req.body.password) {
                    const saltRounds = 10;
                    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
                
                    req.body.password = hashedPassword
                }
            
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id, 
                    { $set: req.body },
                    { new: true }
                ); 
            res.status(200).json(updatedUser);  
            
            } else {
                res.status(403).json('You can update only your account...')
            }
            } catch (err){
                //Passing the error to errorHandler
                next(err)
            }
   
});
// Password Update
router.put('/update-password/:id', verify, [
    body('newPassword').isLength({ min: 6 }).trim().escape(),
    validateInput,
], async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { newPassword } = req.body;

        // Validate that userId is the same as the authenticated user's id
        if (req.user.id !== userId) {
            return res.status(403).json('You can update only your account...');
        }

        // Hash the new password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        // Update the user's password in the database
        await User.findByIdAndUpdate(userId, { $set: { password: hashedPassword } });

        res.status(200).json('Password updated successfully');
    } catch (err) {
        next(err);
    }
});
//Delete User
router.delete('/:id', verify, validateInput, async (req, res) => {
    try {
        if (req.user.id === req.params.id || req.user.isAdmin) {
                await User.findByIdAndDelete(req.params.id);   
                res.status(200).json('User has been deleted!!!!!');   
        } else {
            res.status(403).json('You can delete only your account...')
            }
    } catch (err) {
            next(err);
    }
});
//Find User by ID
router.get('/find/:id', async (req, res) => {
        try{
                const user = await User.findById(req.params.id);
                const { password, ...info } = user._doc;
                res.status(200).json(info)
        }    
        catch (err) {
            next(err);
    }
})
// Get All Users
router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    try {
        if ( req.user.isAdmin ) {
                const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
                res.status(200).json(users);   
            }  else {
                res.status(403).json('You are not allowed to see all users!!');
            }
            } catch (err) {
                next(err)
                
            }
        } 
)
router.use(errorHandler);
module.exports = router;