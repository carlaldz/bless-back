const mongoose = require("mongoose"); 
const bcrypt = require ("bcryptjs"); 
const { isURL } = require ("../validators/string.validators");

const EMAIL_PATTERN =  
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const userSchema = new mongoose.Schema(
    {
        nombre : {
            type: String, 
            required: [true, "El nombre es un campo obligatorio"], 
            maxLength: [30, "El nombre del usuario no puede tener más de 30 caracteres"], 
            trim: true,
        }, 
        apellidos : {
            type: String, 
            required: [true, "El apellido es un campo obligatorio"], 
            trim: true, 
        }, 
        email: {
            type: String, 
            trim: true, 
            lowecase: true, 
            unique: true, 
            required: [true, "El email es un campo obligatorio"], 
            match: [EMAIL_PATTERN, "El email no es válido"],
        },
        password: {
            type: String, 
            required: [true, "La contraseña es un campo obligatorio"], 
            match: [PASSWORD_PATTERN, "La contraseña tiene que tener al menos 8 caracteres"], 
        }, 
        role: {
            type: String, 
            enum: ['admin', 'guest'], 
            default: 'guest'
        }, 
        active: {
            type: Boolean, 
            default: false,
        }, 
        activateToken: {
            type: String, 
            default: function () {
                return (
                    Math.random().toString(36).substring(2,15) + 
                    Math.random().toString(36).substring(2,15) + 
                    Math.random().toString(36).substring(2,15) 
                );
            },
        },
        fotoPerfil: {
            type: String, 
            //default: 
            validate: {
                validator: isURL, 
                message: function () {
                    return "URL de foto de perfil inválido";
                },
            },
        }
    
    }, 
    {
        timestamps: true, 
        toJSON: {
            transform: function (doc, ret) {
                delete ret.__v; 
                delete ret._id; 
                delete ret.password; 
                delete ret.activateToken; 

                ret.id = doc.id; 
                return ret; 
            },
        },
    }
);

const User = mongoose.model('User', userSchema); 
module.exports = User; 