import { Router } from 'express';
import { check } from 'express-validator';

import auth from '../Controllers/Auth.Controller.js'
import ValidateFields from '../Middlewares/ValidateFields.js';
import { ValidarToken } from '../Middlewares/ValidateToken.js';

const router = Router();

/*

    ROUTE:
    /api/auth

*/

router.post('/login', [

    check('user', 'El user es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    ValidateFields

], auth.login)

router.post('/renewtok', ValidarToken, auth.renew)

export default router;