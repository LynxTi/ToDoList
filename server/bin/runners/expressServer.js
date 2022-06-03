require('dotenv').config()
const app = require('../../app');

const PORT = process.env.PORT || 3000;

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server started on PORT - ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

module.exports = start;