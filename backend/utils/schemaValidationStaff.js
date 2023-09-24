const { Joi } = require('celebrate')

const staffRegisterValidation = {
    body: Joi.object().keys({
        surName: Joi.string().min(2).max(30),
        name: Joi.string().min(2).max(30),
        middleName: Joi.string().min(2).max(30),
        role: Joi.string().required(),
        login: Joi.string().required().min(4).max(16),
        password: Joi.string().required().min(8).max(32)
    })
}

const staffUpdateValidation = {
    body: Joi.object().keys({
        surName: Joi.string().min(2).max(30),
        name: Joi.string().min(2).max(30),
        middleName: Joi.string().min(2).max(30),
    })
}

const staffLoginValidation = {
    body: Joi.object().keys({
        login: Joi.string().required().min(4).max(16),
        password: Joi.string().required().min(8).max(32),
        role:Joi.string().required(),
    })
}

const staffAuthValidation = {
    body: Joi.object().keys({
        surName: Joi.string().min(2).max(30),
        name: Joi.string().min(2).max(30),
        middleName: Joi.string().min(2).max(30),
        role: Joi.string().required,
    })
}

module.exports = { staffAuthValidation, staffLoginValidation, staffRegisterValidation, staffUpdateValidation }