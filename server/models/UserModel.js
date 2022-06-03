const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {type: String, reqiured: true},
    email: {type: String, unique: true, reqiured: true},
    password: {type: String, reqiured: true}
})

module.exports = model('User', UserSchema);