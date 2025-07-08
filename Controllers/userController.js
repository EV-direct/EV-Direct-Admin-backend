const User = require("../Models/UserModel");
const firebaseAdmin = require('../constants/firebaseAdmin');

module.exports = {
    getAllUsers: async (req, res) => {
        const { page = 1, limit = 50 } = req.query;
        try {
            const users = await User.find({ role: "user" })
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(Number(limit));
            const totalUsers = await User.countDocuments({ role: "user" });
            const totalPages = Math.ceil(totalUsers / limit);
            res.status(200).json({ data: { users, totalPages }, success: true });
        } catch (error) {
            res.status(500).json({ message: 'Failed to get users', error });
        }
    },

    searchUser: async (req, res) => {
        const { searchQuery, page = 1, limit = 50, status } = req.query;

        try {
            const regex = new RegExp(searchQuery, 'i'); // case-insensitive
            const filter = {
                role: 'user',
            };

            if (searchQuery) {
                filter.$or = [
                    { name: regex },
                    { email: regex }
                ];
            }
            if (status) {
                filter.status = status;
            }

            const users = await User.find(filter)
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(Number(limit));

            const totalUsers = await User.countDocuments(filter);
            const totalPages = Math.ceil(totalUsers / limit);

            res.status(200).json({ data: { users, totalPages }, success: true });
        } catch (error) {
            console.error('Search error:', error);
            res.status(500).json({ success: false, message: 'Failed to search users', error: error.message });
        }
    },

    addUser: async (req, res) => {
        const { firebase_uid, fullName, email, status } = req.body;

        if (!firebase_uid || !email) {
            return res.status(200).json({ success: false, message: 'Firebase UID and email are required' });
        }

        try {
            const newUser = new User({
                firebase_uid,
                fullName,
                email,
                status: status || 'active'
            });

            await newUser.save();
            res.status(201).json({ success: true, message: 'User added successfully', data: newUser });
        } catch (error) {
            console.error('Error adding user:', error);
            res.status(500).json({ success: false, message: 'Failed to add user', error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        try {

            await firebaseAdmin.auth().deleteUser(id)
            await User.findOneAndDelete({ firebase_uid: id });

            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
        }
    },

    updateUser: async (req, res) => {
        const { id } = req.params;
        const { fullName, status } = req.body;

        if (!id) {
            return res.status(200).json({ success: false, message: 'User ID is required' });
        }

        try {

            const updatedUser = await User.findOneAndUpdate({ firebase_uid: id }, {
                fullName,
                status
            }, { new: true });

            if (!updatedUser) {
                return res.status(200).json({ success: false, message: 'User not found' });
            }

            res.status(200).json({ success: true, message: 'User updated successfully' });
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
        }
    }
}