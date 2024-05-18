import { validationResult } from "express-validator";
import { ContactModel } from "../models";

export function validateDataRequest(req, res, next) {
    const result = validationResult(req);

    if(!result.isEmpty()){
        console.log(result.array())
        req.flash('errors', result.array().map(error => error.msg))
        return res.redirect('/agenda-contacto');
    } 

    return next()
}

export async function validateExisteIdMongo(idMongo) {
    const mondoId = await ContactModel.findById(idMongo)
    if(!mondoId){
        throw new Error('ID no existe en la db');
    }
}
