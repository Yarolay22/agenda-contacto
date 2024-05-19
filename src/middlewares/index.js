import { validationResult } from "express-validator";
import { ContactModel } from "../models";

export function validateDataRequest(req, res, next) {
    const result = validationResult(req);

    if(!result.isEmpty()){
        return res.status(400).json({ok: false, errors: result.array().map(error => error.msg)});
    } 

    return next()
}

export async function validateExisteIdMongo(idMongo) {
    console.log({idMongo})
    const mondoId = await ContactModel.findById(idMongo)
    if(!mondoId){
        throw new Error('ID no existe en la db');
    }
}
