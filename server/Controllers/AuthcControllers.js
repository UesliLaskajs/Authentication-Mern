    const { model } = require("mongoose");
    const User = require("../Models/User.model");
    const { createSecretToken } = require("../utils/SecretToken");
    const bcrypt = require("bcrypt");

    module.exports.Signup = async (req, res, next) => {
        try {
            const { email, password, username, createdAt } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({ email, password: hashedPassword, username, createdAt });
            const token = createSecretToken(user._id);

            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false
            });

            res.status(201).json({ msg: "User signed in successfully", success: true, user });
            next(); // Call next() here to move to the next middleware or route handler
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Internal Server Error", success: false });
        }
    };

    
module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({ message: "Please provide an Email and Password" });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Incorrect username or email" });
        }

        const auth = await bcrypt.compare(password, user.password);

        if (!auth) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        const token = createSecretToken(user._id);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false
        });

        res.status(200).json({ message: "User logged in successfully", success: true });
        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};
