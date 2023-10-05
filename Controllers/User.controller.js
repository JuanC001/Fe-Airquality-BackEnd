import { response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

const userController = {};

userController.changePassword = async (req, res = response) => {

    console.log("[USER] Cambiando contraseña")

    const { lastPassword, newPassword, uid } = req.body
    let msg = {

        result: true,
        msg: '¡Contraseña cambiada!'

    }

    try {

        let usuario = await User.findById(uid)

        const validPassword = await bcrypt.compare(lastPassword, usuario.password);
        if (!validPassword) {
            return res.status(401).json({

                result: false,
                msg: 'La contraseña no es correcta'

            })
        }

        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(newPassword, salt)
        usuario.firstLogin = false
        await usuario.save()

        return res.status(200).json(msg)



    } catch (error) {

        msg.msg = 'Hubo un error al cambiar la contraseña'
        msg.result = false
        return res.status(201).json(msg)

    }

    return res.json(msg)

}

userController.changeDevice = async (req, res = response) => {

    console.log("[USER] Cambiando dispositivo")

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

