import { request, response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

import { generateToken } from '../helpers/jwt.js';

const authController = {}

authController.login = async (req = request, res = response) => {

    console.log("[AUTH] Iniciando Sesion (Email)")

    const { user: email, password } = req.body
    try {
        let usuario = await User.findOne({ email })
        if (!usuario) {

            return res.status(401).json({

                result: false,
                msg: 'El usuario o la contraseña no son correctos'

            })

        }

        const validPassword = await bcrypt.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(401).json({

                result: false,
                msg: 'El usuario o la contraseña no son correctos'

            })
        }

        const token = await generateToken(usuario.id, usuario.name, usuario.role)

        res.status(200).json({

            result: true,
            uid: usuario._id,
            name: usuario.name,
            role: usuario.role,
            device: usuario.device,
            firstLogin: usuario.firstLogin,
            token,

        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            result: false,
            msg: 'Hubo un error, comuniquese con el administrador'
        })

    }

}

authController.renew = async (req, res = response) => {

    try {

        console.log("[AUTH] Renovando Token")

        const { uid } = req.body

        const usuario = await User.findById(uid)

        const { firstLogin, name, role, device } = usuario

        const token = await generateToken(uid, name, role)

        return res.status(200).json({
            msg: "Renew",
            token,
            uid,
            name,
            role,
            device,
            firstLogin,
            result: true
        })

    } catch (error) {

        return res.status(500).json({
            result: false,
            msg: 'Hubo un error, comuniquese con el administrador'
        })

    }

}

export default authController;