import { Router } from "express";
import { showPageAgenda } from "../controllers";


const routes = Router();

routes.route('/agenda-contacto')
    .get(showPageAgenda)
    .post((_, res) => res.send('Add a book'))


routes.route('/agenda-contacto/:id')
    .put(function (req, res) {
        res.send('Update the book');
    })
    .patch(() => { })
    .delete(() => { });

routes.use('*', (_, res) => res.redirect('/agenda-contacto'))

export default routes;