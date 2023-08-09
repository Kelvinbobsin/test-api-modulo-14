const Joi = require ('joi')

const usuariosSchema = Joi.object({
    quantidade: Joi.number(), 
    produtos: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        senha: Joi.string(),
        administrador: Joi.string(),
        _id: Joi.string()
    })
})
export default usuariosSchema;