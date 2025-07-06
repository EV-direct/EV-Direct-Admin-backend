const User = require("../Models/UserModel");

module.exports = {
    getAllUsers: async (req, res) => {
        const { page, limit } = req.query;
        try {
            const users = await User.find({role: "user"}).skip((page - 1) * limit).limit(limit);
            res.json({ data: users });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get users', error });
        }
    },

}