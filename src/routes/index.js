import { Router } from "express";
import { body, param } from "express-validator";


import { addContactAgenda, deleteContact, showPageAgenda, showPageAgendaDetail, updateContact } from "../controllers";
import { validateDataRequest, validateExisteIdMongo } from "../middlewares";



const routes = Router();

const validateInputs = [
    body('nombre', 'El nombre es requerido').trim().not().isEmpty().isString(),
    body('telefono', 'El telefono debe contener 10 caracteres numericos').trim().not().isEmpty().isNumeric(),
    body('descripcion').trim().optional().isString(),
    validateDataRequest
]

routes.route('/agenda-contacto')
    .get(showPageAgenda)
    .all(validateInputs)
    .post(addContactAgenda)


routes.route('/agenda-contacto/edit/:idMongo')
    .all([
        param('idMongo', 'Id no valido intenta nuevamente').isMongoId(),
        param('idMongo').custom(validateExisteIdMongo),
        validateDataRequest
    ])
    .get(showPageAgendaDetail)
    .all(validateInputs)
    .post(updateContact)


routes.route('/agenda-contacto/delete/:idMongo')
    .all([
        param('idMongo', 'Id no valido intenta nuevamente').isMongoId(),
        param('idMongo').custom(validateExisteIdMongo),
        validateDataRequest
    ])
    .get(deleteContact);

routes.use('*', (_, res) => res.redirect('/agenda-contacto'))

export default routes;