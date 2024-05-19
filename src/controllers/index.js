
import { ContactModel } from "../models";
import { matchedData } from "express-validator";

export async function getAllContactos(_, res){
   const contactos = await ContactModel.find().sort({'createdAt': 'desc'})
   return res.status(200).json({ok: true, data: contactos})
}

export async function addNewContact(req, res) {
    const body = matchedData(req)

    const contacto = await ContactModel.create(body)

    return res.status(201).json({ok: true, data:{ payload: contacto }})
}


export async function getDetailContact(req, res) {
    const contacto = await ContactModel.findById(req.params.idMongo)
    return res.status(200).json({ok: true, data:{payload: contacto}})
}


export async function updateContact(req, res) {
    
    await ContactModel.findByIdAndUpdate(req.params.idMongo, req.body)

    const contacto = await ContactModel.findById(req.params.idMongo)

    return res.status(200).json({ok: true, data:{payload: contacto}})
}

export async function deleteContact(req, res) {
    await ContactModel.findByIdAndDelete(req.params.idMongo)
    return res.status(200).json({ok: true})
}


