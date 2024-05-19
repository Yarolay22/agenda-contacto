import { Router } from "express";
import { body, param } from "express-validator";


import { addContactAgenda, deleteContact, showPageAgenda, showPageAgendaDetail, updateContact } from "../controllers";
import { validateDataRequest, validateExisteIdMongo } from "../middlewares";



const routes = Router();

// MOSTRAR LA PAGINA
routes.get('/agenda-contacto', showPageAgenda)

routes.use('/agenda-contacto', [
    body('nombre', 'El nombre es requerido').trim().not().isEmpty().isString(),
    body('telefono', 'El telefono debe contener 10 caracteres numericos').trim().not().isEmpty().isNumeric(),
    body('descripcion').trim().optional().isString(),
    validateDataRequest
])


// GUARDAR NUEVO CONTACTO
routes.post('/agenda-contacto', addContactAgenda)

routes.use('/agenda-contacto/:idMongo', [
    param('idMongo', 'Id no valido intenta nuevamente').isMongoId(),
    param('idMongo').custom(validateExisteIdMongo),
    validateDataRequest
])

routes.get('/agenda-contacto/:idMongo', showPageAgendaDetail)









// routes.route('/agenda-contacto/:idMongo')
//     .all([
//         param('idMongo', 'Id no valido intenta nuevamente').isMongoId(),
//         param('idMongo').custom(validateExisteIdMongo),
//         validateDataRequest
//     ])
//     .get(showPageAgendaDetail)
//     .delete(deleteContact)
//     .all(validateInputs)
//     .put(updateContact);



routes.use('*', (_, res) => res.redirect('/agenda-contacto'))

export default routes;