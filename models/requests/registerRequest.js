export let registerRequest = [
    body('username').isAlphanumeric().isLength({ min: 3, max: 20 }).trim().escape(),
    body('email').isEmail().trim().escape(),
    body('password').isLength({ min: 6 }).trim().escape(),
    validateInput,
]