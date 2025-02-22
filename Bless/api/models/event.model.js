const mongoose = require ("mongoose"); 
const dayjs = require ("../config/dayjs.config"); 
const { events } = require ("./user.model");
const { isURL } = require ('../validators/string.validators');

const DATE_FORMAT = "DD/MM/YYYY";

const eventSchema = new mongoose.Schema (
    {
        titulo: {
            type: String, 
            required: [true, "El título es necesario"], 
            trim: true, 
            minLength: [3, "El título tiene que tener al menos 3 caracteres"], 
            maxLength: [100, "El título no puede tener más de 100 caracteres"],
        },
        descripcion: {
            type: String,
            trim: true,
            minLength: [10, "La descripción tiene que tener al menos 3 caracteres"],
            maxLength: [7000, "La descripción tiene un máximo de 7000 caracteres"], 
        },
        edad: {
            type: String, 
            required: [true, "La edad mínima para este evento es necesaria"], 
            trim: true, 
            maxLength: [10, "Edad no puede tener más de 10 caracteres"], 
        },
        fecha: {
            type: Date, 
            required: [true, "La fecha es necesaria"], 
            validate: {
                validator: function (fecha) {
                    return dayjs(fecha, DATE_FORMAT, true).isValid(); 
                }, 
                message: function () {
                    return "El formato de fecha no es correcto"; 
                },
            },
        },
        horario: {
            type: String,
            required: [true, "El horario es necesario"], 
            trim: true,
            maxLength: [30, "El horario no puede tener más de 30 caracteres"], 
        }, 
        dressCode: {
            type: String, 
            trim: true, 
            minLength: [3, "El dress code tiene que tener al menos tres caracteres"],
            maxLength: [20, "El dress code tiene un máximo de 20 caracteres"],
        }, 
        DJ: {
            type: String, 
            trim: true, 
            minLength: [1, "El DJ tiene que tener al menos un caracter"],
            maxLength: [30, "El DJ tiene un máximo de 30 caracteres"],
        }, 
        cartel: {
            type: String, 
            ///default: ''
            validate: {
                validator: isURL, 
                message: function () {
                    return "URL inválida";
                }
            }

        }

    }, 
    {
        timestamps: true,
        toJSON: {
            virtuals: true, 
            transform: function (doc, ret){
                delete ret.__v; 
                delete ret.__; 
                ret.id = doc.id; 
                return ret; 

            },
        },
    }
);

const Event = mongoose.model ("Event", eventSchema); 
module.exports = Event; 