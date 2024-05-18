import { response } from "express";

export function showPageAgenda(req, res = response){
    return res.render('agenda', {errors: req.flash('errors')})
}

export function addContactAgenda(req, res = response) {
    console.log(req.body)
}