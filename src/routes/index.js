import { Router } from "express";
import { body } from "express-validator";


import { addContactAgenda, showPageAgenda } from "../controllers";
import { validateDataRequest } from "../middlewares";


const routes = Router();

routes.route('/agenda-contacto')
    .get(showPageAgenda)
    .all([
        body('nombre', 'El nombre es requerido').trim().not().isEmpty().isString(),
        body('telefono', 'El telefono debe contener 10 caracteres numericos').trim().not().isEmpty().isNumeric(),
        body('descripcion').trim().optional().isAlphanumeric(),
        validateDataRequest
    ])
    .post(addContactAgenda)


routes.route('/agenda-contacto/:id')
    .put(function (req, res) {
        res.send('Update the book');
    })
    .patch(() => { })
    .delete(() => { });

routes.use('*', (_, res) => res.redirect('/agenda-contacto'))

export default routes;