const mongoose = require("mongoose"); 
const { isURL } = require ("../validators/string.validators");
const bcrypt = require ("bcryptjs"); 

const SALT_WORK_FACTOR = 10; 
const EMAIL_PATTERN =  
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_PATTERN = /^.{8,}$/;

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || '')
  .split(',')
  .map((email) => email.trim().toLowerCase());

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
            lowercase: true, 
            unique: true, 
            required: [true, "El email es un campo obligatorio"], 
            match: [EMAIL_PATTERN, "El email no es válido"],
        },
        password: {
            type: String, 
            required: [true, "La password es un campo obligatorio"], 
            match: [PASSWORD_PATTERN, "La password tiene que tener al menos 8 caracteres"], 
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
        }, 
        role: {
            type: String, 
            enum: ['admin', 'guest'], 
            default: 'guest'
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

userSchema.pre("save", function (next) {

    if (ADMIN_EMAILS.includes(this.email)) {
      this.role = 'admin';
    }
  
    if (this.isModified("password")) {
      bcrypt
        .hash(this.password, SALT_WORK_FACTOR)
        .then((hash) => {
          this.password = hash;
          next();
        })
        .catch((error) => next(error));
    } else {
      next();
    }
});


userSchema.methods.checkPassword = function (passwordToCheck) {
  return bcrypt.compare(passwordToCheck, this.password);
};

const User = mongoose.model('User', userSchema); 
module.exports = User; 