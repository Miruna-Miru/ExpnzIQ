const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs'); // ✅ import bcryptjs

// LOGIN CONTROLLER
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send('User Not Found');
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid Credentials');
        }

        // Password matched — return user info (excluding password)
        const { password: _, ...userData } = user._doc;

        res.status(200).json({
            success: true,
            user: userData,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

// REGISTER CONTROLLER
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with hashed password
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(201).json({
            success: true,
            newUser: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        });
    }
};

module.exports = { loginController, registerController };
