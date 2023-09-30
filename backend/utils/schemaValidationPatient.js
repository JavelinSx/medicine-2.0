const { Joi } = require('celebrate')

const patientRegisterValidation = {
    body: Joi.object().keys({
        surName: Joi.string().min(2).max(30),
        name: Joi.string().min(2).max(30),
        middleName: Joi.string().min(2).max(30),
        gender: Joi.string(),
        dateBirthday: Joi.string(),
        files: Joi.array().items(Joi.string()), 
        role: Joi.string(),
        login: Joi.string().required().min(4).max(16),
        password: Joi.string().required().min(8).max(32)
    })
}

const patientUpdateValidation = {
    body: Joi.object().keys({
        surName: Joi.string().min(2).max(30),
        name: Joi.string().min(2).max(30),
        middleName: Joi.string().min(2).max(30),
        gender: Joi.string(),
        dateBirthday: Joi.string(),
        files: Joi.array().items(Joi.string()), 
    })
}

const patientLoginValidation = {
    body: Joi.object().keys({
        login: Joi.string().required().min(4).max(16),
        password: Joi.string().required().min(8).max(32)
    })
}

const patientAuthValidation = {
    body: Joi.object().keys({
        surName: Joi.string().min(2).max(30),
        name: Joi.string().min(2).max(30),
        middleName: Joi.string().min(2).max(30),
        gender: Joi.string(),
        dateBirthday: Joi.string(),
        role: Joi.string(),
        files: Joi.array().items(Joi.string()), 
    })
}

module.exports = { patientAuthValidation, patientLoginValidation, patientRegisterValidation, patientUpdateValidation }