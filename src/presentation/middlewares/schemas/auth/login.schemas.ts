import Joi from "joi";
const email = Joi.string().email().max(255);
const password = Joi.string().min(8).max(11);
const token = Joi.string().min(20).max(255);
const name = Joi.string().min(4).max(50);

export const loginAuth = Joi.object({
    email: email.required(),
    password: password.required()
});

export const emailRecoveryPassword = Joi.object({
    email: email.required()
});

export const changePassword = Joi.object({
    password: password.required(),
    verify_password: Joi.string().valid(Joi.ref('password')).required()
    .messages({
      'any.only': 'Las contraseñas suministradas no coinciden por favor verifique los datos.'
    })
});
export const getToken = Joi.object({
    token: token.required(),
  });
  
export  const registryUser = Joi.object({
    email: email.required(),
    password: password.required(),
    name: name.required(),
});