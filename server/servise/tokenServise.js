const jwt = require('jsonwebtoken');
const TokenModel = require('../models/TokenbModel');



    const generateTokens = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '5m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'});

        return{
            accessToken,
            refreshToken
        }
    }

    const saveToken = async (userId, refreshToken) => {
        console.log('refreshToken', refreshToken);
        console.log('userId', refreshToken);

        const tokenData = await TokenModel.findOne({user: userId});

        if (tokenData){
            tokenData.refreshToken = refreshToken
            console.log('перезапись токена _________________________________');

            return tokenData.save();
        }
        console.log('НОВІЙ ТОКЕН +++++++++++++++++++++++++++++++++++++++++');

        const token = await TokenModel.create({user: userId, refreshToken: refreshToken});
        return token;
    }

    const removeToken = async (refreshToken) => {
        await TokenModel.findOneAndRemove({refreshToken});
    }

    const validateAccessToken = (token) => {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);

            return userData; 
        } catch (e) {
            return null
        }
    }

    const validateRefreshToken = (token) => {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);

            return userData; 
        } catch (e) {
            return null
        }
    }

    const findToken = async (refreshToken) => {
        const tokenData = await TokenModel.findOne({refreshToken});
        return tokenData;
    }

module.exports = {
    generateTokens,
    saveToken,
    removeToken,
    findToken,
    validateRefreshToken,
    validateAccessToken
};