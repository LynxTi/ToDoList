const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const errorHandler = require('./midelwares/customsError');

const authRouter = require('./routes/auth');
app.use(cors(
    {
    credentials: true,
    origin: 'http://localhost:3000',
    methods: 'GET, POST',
    optionsSuccessStatus: 200
    
}
));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use(errorHandler.myErrorBox);

module.exports = app;