import { Router } from "express";
import { ValidarToken } from '../Middlewares/ValidateToken.js';
import adminController from "../Controllers/Admin.Controller.js";

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/getAllList', adminController.getAllUsers);
router.post('/getOneUser', adminController.getOneUser);

router.post('/verifyOwner', adminController.verifyOwner);
router.post('/verifyUser', adminController.verifyUser);

router.post('/autocomplete', adminController.autocomplete);
router.post('/getLongLat', adminController.getLongLat);

router.post('/deleteDevice', adminController.deleteDevice);
router.post('/getDeviceList', adminController.getDeviceList)

router.post('/deleteuser', adminController.deleteUser);
router.post('/createUser', adminController.createUser);
router.post('/updateUser', adminController.updateUser);



export default router;