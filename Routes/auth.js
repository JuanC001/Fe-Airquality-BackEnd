import { Router } from 'express';
import { check } from 'express-validator';

import auth from '../Controllers/Auth.Controller.js'
import ValidateFields from '../Middlewares/ValidateFields.js';

const router = Router();

router.post('/login', [

    check('user', 'El user es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    ValidateFields

], auth.login)

router.post('/register', [
    check('user', 'El user es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('password2', 'El password es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser @unbosque.edu.co').isEmail({ domain_specific_validation: '@unbosque.edu.co' }).not().isEmpty(),
    check('rol', 'El rol es obligatorio').not().isEmpty(),
    check('email', 'El email debe ser @unbosque.edu.co').not().isEmpty().custom(

        value => {
            if (!/@unbosque.edu.co\b/.test(value)) {
                throw new Error('El email debe ser @unbosque.edu.co')
            }
            return true
        }

    ),
    ValidateFields
], auth.register)

router.post('/renewtok', auth.renew)

export default router;