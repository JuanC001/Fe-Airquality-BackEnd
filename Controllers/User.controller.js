import { response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

const userController = {};

userController.changePassword = async (req, res = response) => {

    const { password, uid } = req.body
    let msg = {

        result: true,
        msg: '¡Contraseña cambiada!'

    }
    const salt = bcrypt.genSaltSync()

    try {

        let usuario = await User.findById(uid)
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save()

    } catch (error) {

        msg.msg = 'Hubo un error al cambiar la contraseña'
        msg.result = false
        return res.status(201).json(msg)

    }

    return res.json(msg)

}

userController.changeDevice = async (req, res = response) => {

    const { newDevice, uid } = req.body
    let msg = {
        result: true,
    }
    try {
        await User.findByIdAndUpdate(uid, { device: newDevice })
    } catch (error) {
        msg = { result: false }
    }

    return res.status(200).json(msg)

}

userController.getDevice = async (req, res = response) => {

}

export default userController

