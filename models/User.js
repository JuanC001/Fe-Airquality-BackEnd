import { Schema, model } from "mongoose";

const UserSchema = new Schema({

    nombre: { type: 'string', required: true },
    user: { type: 'string', required: true, unique: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    rol: { type: 'string', required: true },
    dispositivo_id: { type: 'string', required: true }

})

export default model('User', UserSchema);