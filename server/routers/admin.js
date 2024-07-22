const express = require('express');
const router = express.Router();
const User = require('../model/usermodel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;
const cookieParser = require('cookie-parser');

// Ensure you use the cookie parser middleware in your main app file
// const app = express();
// app.use(cookieParser());

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized'
        });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Unauthorized'
        });
    }
};

router.get('/admin',async (req, res) => {
    try {
        res.render('admin/index', { layout: adminLayout });
    } catch (error) {
        console.log(error);
    }
});

router.post('/admin', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecret);
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
});

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 12);
        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({
                alert: "user created"
            });
        } catch (error) {
            if (error.code === 11000) {
                return res.status(409).json({
                    message: 'User already in use',
                });
            }
            res.status(500).json({
                message: "internal server error"
            });
        }
    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie("token");
    res.redirect('/');
});

module.exports = router;
