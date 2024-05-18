import { Schema, model } from "mongoose";


const ContactSchema = new Schema({
    nombre: {
        type: Schema.Types.String,
        required: true
    },
    telefono: {
        type: Schema.Types.Number,
        required: true
    },
    descripcion:{
        type: Schema.Types.String,
        default: ''
    }
}, {timestamps: true, versionKey: false})


export const ContactModel = model('Contact', ContactSchema)