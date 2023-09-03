import pkg from 'jsonwebtoken';
import { response } from 'express';
const { verify } = pkg;

export const ValidarToken = (req, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {

        return res.status(401).json({
            result: false,
            msg: 'No token'
        })

    }

    try {

        const payload = verify(

            token, process.env.SECRET_JWT_SEED

        );

        req.uid = payload.uid;
        req.name = payload.name;

        console.log(payload);

    } catch (error) {
        res.status(401).json({

            result: false,
            msg: 'token no valido'

        })
    }

    next();

}