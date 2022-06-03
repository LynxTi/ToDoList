const { validateAccessToken } = require("../servise/tokenServise");
const { sendUnauthorizedError } = require("./customsError");

const authMiddlleware = (req,res,next) => {
    try {
        const {accessToken} = req.body;

        if (!accessToken) {
            return next(sendUnauthorizedError('user is not authorized'));
        }
        const userData = validateAccessToken(accessToken);

        if (!userData) {
            return next(sendUnauthorizedError('user is not authorized'));
        }

        req.user = userData;
        next();
    } catch (e) {
        return next(sendUnauthorizedError('user is not authorized'));
    }
}

module.exports = authMiddlleware;