import { response } from 'express';
import { validationResult } from 'express-validator';

import User from '../models/User.js';

const authController = {}

authController.login = (req, res = response) => {

    const { user, password, email } = req.body
    //Res.status(codigo)

    res.json({
        user: user,
        role: rol
    })

}

authController.register = async (req, res = response) => {

    const {email, user, password, pasword2} = req.body;

    try {

        let usuario = await User.findOne({user})
        let correo = await User.findOne({email})

        if (usuario){
            return res.status(400).json({
                result: 'false',
                msg: 'El usuario ya existe'
            })
        }

        if (correo){
            return res.status(400).json({
                result: 'false',
                msg: 'El email ya esta inscrito'
            })
        }

        usuario = new User(req.body);
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

authController.renew = (req, res = response) => {

    res.json({
        msg: "Renew"
    })
}


export default authController;