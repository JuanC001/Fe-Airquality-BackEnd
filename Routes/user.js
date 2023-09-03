import { Router } from "express";
import { ValidarToken } from '../Middlewares/ValidateToken.js';
import userController from "../Controllers/User.controller.js";

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/device', ValidarToken, userController.getDevice);
router.post('/changePassword', ValidarToken, userController.changePassword);
router.post('/changedevice', ValidarToken, userController.changeDevice);
router.post('/registerdevice', ValidarToken, userController.changeDevice);


export default router;