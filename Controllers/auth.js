const { response } = require('express');
const authController = {}
const { validationResult } = require('express-validator')

authController.login = (req, res = response) => {

    const { user, password, email } = req.body
    const rol = 'admin'
    //Res.status(codigo)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({

            result: false,
            errors: errors.mapped()

        })

    }

    res.json({
        user: user,
        role: rol
    })

}

authController.register = (req, res = response) => {

    res.json({
        message: "Register"
    })
}

authController.renew = (req, res = response) => {

    res.json({
        message: "Renew"
    })
}


module.exports = authController;