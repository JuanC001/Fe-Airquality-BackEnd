import pkg from 'jsonwebtoken';
const { sign } = pkg;

export const generateToken = (uid, name, role) => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name, role };

        sign(payload, process.env.SECRET_JWT_SEED, {

            expiresIn: '1h'

        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token);

        })
    })

}