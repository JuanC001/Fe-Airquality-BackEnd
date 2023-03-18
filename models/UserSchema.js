const mongoose = require('mongoose')

const {Schema, model} = mongoose;

const UserSchema = new Schema({

    nombre: {type: 'string', required: true},
    user: {type: 'string', required: true},
    email: {type: 'string', required: true},
    password: {type: 'string', required: true},
    rol: {type: 'string', required: true},

})

module.exports = model('User', UserSchema);