import { response } from "express";
import { validationResult, matchedData } from "express-validator";

export function validateDataRequest(req, res = response, next) {
    const result = validationResult(req);

    if(!result.isEmpty()){
        console.log(result.array())
        req.flash('errors', result.array().map(error => error.msg))
        return res.redirect('/agenda-contacto');
    } 

    req.body = matchedData(req)
    return next()
}