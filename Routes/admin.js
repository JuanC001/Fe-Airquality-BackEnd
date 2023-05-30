import { Router } from "express";
import { ValidarToken } from '../Middlewares/ValidateToken.js';
import adminController from "../Controllers/Admin.Controller.js";

const router = Router();



//Retorna todos los dispositivos (con datos)
router.post('/getAllList', ValidarToken, adminController.getAllUsers);
router.post('/getOneUser', ValidarToken, adminController.getOneUser);

export default router;