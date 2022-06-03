require('dotenv').config()
const mongoose = require('mongoose');
const dbUrl = process.env.MONGODB_URL;
const option = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const start = async () => {
    mongoose.connect(dbUrl, option);
    const db = mongoose.connection;

    db.on('eror', (err) => {
        console.log('Db erore: ', err);
    });

    db.once('open', () => {
        console.log('Conected DB');

    });

    db.once('close', () => {
        console.log('DB close');
    });
}

module.exports = start;