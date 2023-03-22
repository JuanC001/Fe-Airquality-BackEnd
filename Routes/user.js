import { Router } from "express";
import { ValidarToken } from '../Middlewares/ValidateToken.js';

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/device/:id', ValidarToken, );
router.post('/changePassword');

export default router;