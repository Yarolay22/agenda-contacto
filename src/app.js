import { join } from "path";

import express from 'express'
import cors from 'cors'
import expressSession from 'express-session'

import Routes from "./routes";

const app = express();


//Middleware
app.use(express.json())

app.use(cors({origin: '*'}))

app.use(expressSession({
    secret: 'claveprotejida',
    resave: false,
    saveUninitialized: true
}))


// Template Engine
app.set('views', join(__dirname, 'template'))
app.set('view engine', 'pug')


// Routes
app.use('/', Routes)


// Server
app.listen(3000, () => console.log('[APP]: Corriendo en el puerto => ', 3000))