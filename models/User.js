import { Schema, model } from "mongoose";

const UserSchema = new Schema({

    name: { type: 'string', required: true },
    user: { type: 'string', required: true, unique: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    role: { type: 'string', required: true },
    device: { type: 'string', required: false, unique: true}

});

export default model('User', UserSchema);