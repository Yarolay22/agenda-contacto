import { response } from "express";
import { ContactModel } from "../models";

export function showPageAgenda(req, res = response){
    return res.render('agenda', {errors: req.flash('errors'), success: req.flash('success')})
}

export async function addContactAgenda(req, res = response) {
    await ContactModel.create(req.body)
    req.flash('success', 'Contacto registrado exitosamente!')
    return res.redirect('/agenda-contacto')
}