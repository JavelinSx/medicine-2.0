const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const staffSchema = new mongoose.Schema({
    surName: {
        type: String,
    },
    name: {
        type: String,
    },
    middleName: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['doctor', 'nurse', 'registrator']
    },
    login: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    canDelete: {
        type: Boolean,
        default: false, // Устанавливаем значение по умолчанию в false
    },
})

staffSchema.statics.findUserByCredentials = function findStaff(login, password, role) {
    return this.findOne({ login, role }).select('+password')
        .then((staff) =>
            bcrypt
                .compare(password, staff.password)
                .then((matched) => {
                    if (!matched) {
                        return Promise.reject(new Error('Ошибка авторизации'))
                    }
                    staff.role!=='doctor' ? staff.canDelete=false : staff.canDelete=true
                    return staff;
                })
        )
}

module.exports = mongoose.model('staff', staffSchema)