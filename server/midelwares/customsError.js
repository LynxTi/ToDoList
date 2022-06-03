// Будущий Я не втыкани убрать эти функции тут должен остатьться только мидлвар
const sendBadRequestError = (message) => {
    return {
        status: 400,
        name: 'badRequest',
        message: message
    };
}

const sendUnauthorizedError = (message) => {
    return {
        status: 401,
        name: 'authError',
        message: message
    };
}

const myErrorBox = (err, req, res, next) => {
    console.log(err);

    if (err.status) {
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json('unexpected error и вообще я хрен знает как это работает'); 
}

module.exports = {
    sendBadRequestError,
    sendUnauthorizedError,
    myErrorBox
}