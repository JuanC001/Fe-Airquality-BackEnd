import { response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';

import { generateToken } from '../helpers/jwt.js';

const authController = {}

authController.login = async (req, res = response) => {

    const { user, password } = req.body
    try {

        let usuario = await User.findOne({ user })
        if (!usuario) {

            return res.status(400).json({

                result: false,
                msg: 'El usuario o la contraseña no son correctos'

            })

        }

        const validPassword = bcrypt.compare(usuario.password, password);
        if (!validPassword) {
            return res.status(400).json({

                result: false,
                msg: 'El usuario o la contraseña no son correctos'

            })
        }

        const token = await generateToken(usuario.id, usuario.name)

        res.json({

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

authController.register = async (req, res = response) => {

    const salt = bcrypt.genSaltSync();
    const { email, user, password, pasword2 } = req.body;

    try {

        let usuario = await User.findOne({ user })
        let correo = await User.findOne({ email })

        if (usuario) {
            return res.status(400).json({
                result: 'false',
                msg: 'El usuario ya existe'
            })
        }

        if (correo) {
            return res.status(400).json({
                result: 'false',
                msg: 'El email ya esta inscrito'
            })
        }

        usuario = new User(req.body);
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
    } catch (error) {
        res.status(500).json({
            result: false,
            msg: 'Algo salio Mal, comuniquese con el Administrador'
        })
        console.log(error)
        return;
    }

    res.status(201).json({
        result: true,
        msg: "Register"
    })
}

authController.renew = async (req, res = response) => {

    const usuario = {

        uid: req.uid,
        name: req.name

    }
    const token = await generateToken(usuario.uid, usuario.name)

    res.json({
        msg: "Renew",
        token
    })

}

export default authController;