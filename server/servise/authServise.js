const bcrypt = require('bcrypt');
const UserModel = require('../models/UserModel');
const tokenServise = require('./tokenServise');
const errorHendler = require('../midelwares/customsError');

    const registration = async (name, email, password)=> {
        const chekUser = await UserModel.findOne({email});
        if (chekUser) {
            throw new Error('User with this email already exists');
        }
        const hashPassword = await bcrypt.hash(password, 3);
        console.log('hashPassword', hashPassword);

        const user = await UserModel.create({name: name, email: email, password: hashPassword});

        const userData = {id: user.id, name: user.name, email: user.email};
        const tokens = tokenServise.generateTokens(userData);
        await tokenServise.saveToken(user._id, tokens.refreshToken);

        return {
            userData,
            ...tokens
        }
    }

    const login = async (email, password) => {
        const user = await UserModel.findOne({email});

        if (!user) {
            throw errorHendler.sendBadRequestError('User with this email not found');
        }
         const chekPassword = await bcrypt.compare(password, user.password)
        if (!chekPassword) {
            throw errorHendler.sendBadRequestError('incorrect password');
        }

        const userData = {id: user.id, name: user.name, email: user.email};
        const tokens = tokenServise.generateTokens(userData);
        await tokenServise.saveToken(user._id, tokens.refreshToken);

        return {
            userData,
            ...tokens
        }

    } 

    const logout = async (refreshToken) => {
        tokenServise.removeToken(refreshToken);
    }

    const refresh = async (refreshToken) => {
        if (!refreshToken) {
            throw errorHendler.sendUnauthorizedError('user is not authorized');

        }
        const user = tokenServise.validateRefreshToken(refreshToken);
        const tokenFromDB = tokenServise.findToken(refresh);

        if (!userData || !tokenFromDB) {
            throw errorHendler.sendUnauthorizedError('user is not authorized');
        }

        const userData = {id: user.id, name: user.name, email: user.email};
        const tokens = tokenServise.generateTokens(userData);
        await tokenServise.saveToken(user._id, tokens.refreshToken);

        return {
            userData,
            ...tokens
        }
    }

module.exports = {
    registration,
    login,
    logout,
    refresh
};