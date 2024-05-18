import { response } from "express";
import { ContactModel } from "../models";
import { matchedData } from "express-validator";

export async function showPageAgenda(req, res = response){
   return await renderPageAgenda(res, req, {nombre: '', telefono: '', descripcion: ''})
}

export async function addContactAgenda(req, res = response) {
    const body = matchedData(req)

    await ContactModel.create(body)

    req.flash('success', 'Contacto registrado exitosamente!')
    return res.redirect('/agenda-contacto')
}


export async function showPageAgendaDetail(req, res = response) {
    const dataContacto = await ContactModel.findById(req.params.idMongo)
    return await renderPageAgenda(res, req, dataContacto)
}


export async function updateContact(req, res = response) {
    
    await ContactModel.findByIdAndUpdate(req.params.idMongo, req.body)

    req.flash('success', 'Contacto actualizado exitosamente!')
    return res.redirect('/agenda-contacto')

}

export async function deleteContact(req, res) {
    await ContactModel.findByIdAndDelete(req.params.idMongo)
    req.flash('success', 'Contacto eliminado exitosamente!')
    return res.redirect('/agenda-contacto')
}

async function renderPageAgenda(res, req, dataContacto) {
    const contactos = await ContactModel.find().sort({'createdAt': 'desc'})
    return res.render('agenda', {
        errors: req.flash('errors'), 
        success: req.flash('success'), 
        contactos, 
        dataContacto,
    })
}



