const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");

module.exports = {
    login: async (req, res) => {
        try {
            const { email, firebase_uid } = req.body;
            const user = await User.findOne({ email, firebase_uid, role: 'admin' });
            if (user) {
                const token = jwt.sign({ user: user }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
                res.status(200).json({ success: true, message: 'Login successful', data: { user, token } });
            } else {
                res.status(200).json({ message: 'Invalid credentials', success: false });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to login', error });
        }
    }
}