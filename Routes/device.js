import { Router } from "express";
import { check } from "express-validator";
import device from '../Controllers/Device.controller.js'

import { ValidarToken } from '../Middlewares/ValidateToken.js';

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/getAllList', ValidarToken, device.getAllDevicesList);
router.post('/getAll', ValidarToken, device.getAllDevices);
router.post('/deleteDevice', ValidarToken, device.deleteDevice);
router.post('/getOneDevice', ValidarToken, [

    check('id', 'El ID es obligatorio').not().isEmpty()

], device.getOneDevice);
router.post('/', device.reginfo);

export default router;