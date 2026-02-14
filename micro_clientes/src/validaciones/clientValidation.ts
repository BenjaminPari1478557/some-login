import Joi from "joi";
import { IRegisterClientPayload } from "../interfaces/client.interface";

const minDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 18);

export const registerClientSchema = Joi.object<IRegisterClientPayload>({
  tipo_documento: Joi.string().valid("DNI", "CE").required(),
  nro_documento: Joi.string().min(8).max(12).required(),
  nombres: Joi.string().min(3).required(),
  apellidos: Joi.string().min(3).required(),
  fecha_nacimiento: Joi.date().max(minDate).required().messages({
    "date.max": "El cliente debe ser mayor de edad.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "El formato del correo electrónico no es válido",
    "any.required": "El correo electrónico es obligatorio",
  }),
  bono_bienvenida: Joi.number().precision(2).min(0).required(),
  token_seguridad: Joi.string().length(8).required(),
});
