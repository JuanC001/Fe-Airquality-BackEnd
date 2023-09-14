import { Router } from "express";
import { ValidarToken } from '../Middlewares/ValidateToken.js';
import adminController from "../Controllers/Admin.Controller.js";

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/getAllList', ValidarToken, adminController.getAllUsers);
router.post('/getOneUser', ValidarToken, adminController.getOneUser);

router.post('/verifyOwner', ValidarToken, adminController.verifyOwner);
router.post('/verifyUser', ValidarToken, adminController.verifyUser);

router.post('/autocomplete', ValidarToken, adminController.autocomplete);
router.post('/getLongLat', ValidarToken, adminController.getLongLat);

router.post('/deleteDevice', ValidarToken, adminController.deleteDevice);
router.post('/getDeviceList', ValidarToken, adminController.getDeviceList)

router.post('/deleteuser', ValidarToken, adminController.deleteUser);
router.post('/createUser', ValidarToken, adminController.createUser);
router.post('/updateUser', ValidarToken, adminController.updateUser);



export default router;