const mongoose = require("mongoose");
const { isURL } = require ("../validators/string.validators");
const dayjs = require ('dayjs'); 

const eventSchema = new mongoose.Schema(
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
        set: (fecha) => {
          if (!fecha) return fecha;
          let parsedDate = dayjs(fecha, DATE_FORMAT, true);
          if (!parsedDate.isValid()) {
            parsedDate = dayjs(fecha);
          }
          return parsedDate.isValid() ? parsedDate.toDate() : undefined;
        },
        validate: {
          validator: function (fecha) {
            return dayjs(fecha).isValid();
          },
          message: "El formato de fecha no es correcto",
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
      musica: {
        type: String,
        trim: true,
        minLength: [1, "La musica tiene que tener al menos un caracter"],
        maxLength: [100, "La musica tiene un máximo de 30 caracteres"],
      },
      cartelURL: {
        type: String,
        validate: {
          validator: isURL,
          message: function () {
            return "URL inválida";
          },
        },
      },
    },
    {
      timestamps: true,
      toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
          delete ret.__v;
          delete ret._id;  // Eliminamos el _id
          ret.id = doc.id;  // Agregamos id en lugar de _id
          if (ret.fecha) {
            ret.fecha = dayjs(ret.fecha).format("DD/MM/YYYY");
          }
          return ret;
        },
      },
    }
  );
  
  const Event = mongoose.model("Event", eventSchema);
  module.exports = Event;
  