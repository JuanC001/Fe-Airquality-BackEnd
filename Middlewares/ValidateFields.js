import { response } from "express";
import { validationResult } from "express-validator";

const ValidateFields = (req, res = response, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({

            result: false,
            errors: errors.mapped()

        })
    }

    next();

}

export default ValidateFields;