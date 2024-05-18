import { join } from "path";
import env from "dotenv";

env.config({path: join( __dirname, '..', '..', '.env')})

export const EnvConfig = {
    PORT: process.env.PORT ?? 3000,
    SESSION_SECRET: process.env.SESSION_SECRET ??  'tu-llave-secreta',
    MONGO_URI: process.env.MONGO_URI ??  'mongodb://127.0.0.1:27017/test',
}