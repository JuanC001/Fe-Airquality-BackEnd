const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const auth = require('../Controllers/auth');

router.post('/login', [

    check('user', 'El user es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),

], auth.login)

router.post('/register', [
    check('user', 'El user es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password2', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail({ domain_specific_validation: '@unbosque.edu.co' }).not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'Email no valido').not().isEmpty().custom(

        value => {
            if (!/@unbosque.edu.co\b/.test(value)) {
                throw new Error('Invalid Domain')
            }
            return true
        }

    )
], auth.register)

router.post('/renewtok', auth.renew)


module.exports = router;