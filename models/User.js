import { Schema, model } from "mongoose";

const UserSchema = new Schema({

    name: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    role: { type: 'string', required: true },
    device: { type: 'string', required: false, unique: true},
    direccion: { type: 'string', required: false },

    blocked: { type: 'boolean', required: true, default: false },
    dateBlocked: { type: 'date', required: false },
    firstLogin: { type: 'boolean', required: true, default: true },

});

export default model('User', UserSchema);