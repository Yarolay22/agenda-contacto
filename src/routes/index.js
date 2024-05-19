import { Router } from "express";
import { body, param } from "express-validator";


import { addNewContact, deleteContact, getAllContactos, getDetailContact, updateContact } from "../controllers";
import { validateDataRequest, validateExisteIdMongo } from "../middlewares";


const routes = Router();

// MOSTRAR LA PAGINA
routes.get('/agenda-contacto', getAllContactos)


// MIDDLEWARE VALIDATOR PARA ID MONGO
routes.use('/agenda-contacto/:idMongo', [
    param('idMongo', 'Id no valido intenta nuevamente').isMongoId(),
    param('idMongo').custom(validateExisteIdMongo),
    validateDataRequest
])


// DETALLE DEL CONTACTO
routes.get('/agenda-contacto/:idMongo', getDetailContact)


// ELIMINAR CONTACTO
routes.delete('/agenda-contacto/:idMongo', deleteContact)



// MIDDLEWARE VALIDATOR PARA BODY
routes.use('/agenda-contacto', [
    body('nombre', 'El nombre es requerido').trim().not().isEmpty().isString(),
    body('telefono', 'El telefono debe contener 10 caracteres numericos').trim().not().isEmpty().isNumeric(),
    body('descripcion').trim().optional().isString(),
    validateDataRequest
])

// GUARDAR NUEVO CONTACTO
routes.post('/agenda-contacto', addNewContact)


// ACTUALIZAR EL CONTACTO
routes.put('/agenda-contacto/:idMongo', updateContact)


export default routes;