import { Router } from "express";
import { check } from "express-validator";
import device from '../Controllers/Device.controller.js'

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/getAllList', device.getAllDevicesList);
router.post('/getAll', device.getAllDevices);
router.post('/getOneDevice',[

    check('id', 'El ID es obligatorio').not().isEmpty()

], device.getOneDevice);
router.post('/', device.reginfo);

export default router;