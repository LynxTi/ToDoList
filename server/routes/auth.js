// const router = require('express').Router();
const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const authController = require('../controllers/authController');

router.post('/registartion', 
    body('email').isEmail(), 
    body('name').isLength({min: 2}),
    body('password').isLength({min: 5}),
    authController.registration
);
router.post('/login', authController.login);
router.get ('/logout', authController.logout);
router.get ('/refresh', authController.refresh);


module.exports = router;