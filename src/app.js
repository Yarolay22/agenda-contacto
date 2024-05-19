import { join } from "path";

import express from 'express'
import cors from 'cors'


import Routes from "./routes";
import { EnvConfig } from "./config";
import { connection } from "./databases";

const app = express();



//Middleware
app.use(express.json())

app.use(express.urlencoded({extended: false}))

app.use(cors({origin: '*'}))

// Static Files
app.use(express.static(join(__dirname, './public')))


// Routes
app.use('/', Routes)


// Connection MongoDB
connection()
    .then(() => app.listen(EnvConfig.PORT, () => console.log('[APP]: Corriendo en el puerto => ', EnvConfig.PORT)))
    .catch(() => console.warn('No se puedo realizar la conexion exitosamente a mongo!'))

