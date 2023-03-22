import { Router } from "express";

const router = Router();

//Retorna todos los dispositivos (con datos)
router.post('/', (req, res) => {

    console.log(req.body);

    res.json({

        result: true

    })

});

export default router;