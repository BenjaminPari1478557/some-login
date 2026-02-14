import Joi from "joi";

export const validateTokenSchema= Joi.object({
  token: Joi.string()
    .length(8)
    .required()
    .messages({
      'string.length': 'Longitud incorrecta', //Preferible que no vaya este mensaje, solo para mostrar
      'any.required': 'El token es obligatorio para la validacion'
    })
});