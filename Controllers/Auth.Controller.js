import { request, response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

import { generateToken } from '../helpers/jwt.js';

const authController = {}

authController.login = async (req = request, res = response) => {

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

    const usuario = {

        uid: req.uid,
        name: req.name

    }
    const token = await generateToken(usuario.uid, usuario.name)

    return res.status(201).json({
        msg: "Renew",
        token,
        uid: usuario.uid,
        name: usuario.name
    })

}

export default authController;