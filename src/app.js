import { join } from "path";

import express from 'express'
import cors from 'cors'
import expressSession from 'express-session'
import flash from "connect-flash";

import Routes from "./routes";
import { EnvConfig } from "./config";

const app = express();



//Middleware
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(cors({origin: '*'}))

app.use(expressSession({
    secret: EnvConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 5000 }
}))


app.use(flash())


// Template Engine
app.set('views', join(__dirname, 'template'))
app.set('view engine', 'pug')


// Routes
app.use('/', Routes)


// Server
app.listen(EnvConfig.PORT, () => console.log('[APP]: Corriendo en el puerto => ', EnvConfig.PORT))