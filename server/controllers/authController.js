const authServise = require('../servise/authServise');
const {validationResult} = require('express-validator');
    
    const registration = async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.json({error: 'validation error!!!', errors: errors});
            }
            const {name, email, password} = req.body;   
            const userData = await authServise.registration(name, email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            res.cookie('testCookie', 'testtesttest');

           

            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

    const login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userData = await authServise.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)

        }

    }

    const logout = async (req, res, next) => {
        console.log('cookiiii: ', req.cookies);
        console.log('refreshTokenCooki: ', req.cookies.refreshToken);
        console.log('testtesttestCooki: ',req.cookies.testtesttest);

        try {
            const {refreshToken} = req.cookies;
            await authServise.logout(refreshToken);
            res.clearCookie('refreshToken');
        } catch (e) {
            next(e)

        }
    }

    const refresh = async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authServise.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e)
        }
    }

module.exports = {
    registration,
    login,
    logout,
    refresh
};