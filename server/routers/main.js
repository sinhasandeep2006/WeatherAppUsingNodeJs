const express = require('express');
const router = express.Router();


router.get('', async (req, res) => {
    try {
        res.render('index', {
        });
    } catch (error) {
        console.log(error);
    }
});
router.get('/about', (req, res) => {
    res.render('about');
});
router.get('/contact', (req, res) => {
    res.render('contact');
});
module.exports =router