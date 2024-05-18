import { response } from "express";
import { validationResult } from "express-validator";

export function validateDataRequest(req, res = response, next) {
    const result = validationResult(req);

    if(!result.isEmpty()){
        req.flash('errors', result.array().map(error => error.msg))
        return res.redirect('/agenda-contacto');
    } 

    return next()
}