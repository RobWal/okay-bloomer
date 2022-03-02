const userCreateValidator = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        return res.status(400).json({
            message: 'Please provide a username and a password.',
        });
    }
    if (username.length < 4) {
        return res.status(400).json({
            message: 'Username must be at least 4 characters.',
        });
    }
    if (password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters.',
        });
    }

    next();
};

module.exports = userCreateValidator;
