const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const auth = require('../Controllers/auth');

router.post('/login', [

    check('user','El user es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio').not().isEmpty()

], auth.login)
router.post('/register', auth.register)
router.post('/renewtok', auth.renew)


module.exports = router;