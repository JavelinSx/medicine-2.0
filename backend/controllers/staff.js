require('dotenv').config()

const { ERRORS_MESSAGE } = require('../utils/constant')
const BadRequestError = require('../errors/bad_request');
const NotFoundError = require('../errors/not_found_error');
const BadAuthError = require('../errors/bad_auth');
const ExistLoginError = require('../errors/exist_login_error');

const { NODE_ENV, JWT_PROD } = process.env
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_DEV } = require('../utils/constant')
const Staff = require('../models/staff');
const PermissionError = require('../errors/permission_error');

module.exports.loginStaff = (req, res, next) => {
    const { login, password, role } = req.body;
    Staff.findUserByCredentials(login, password, role)
        .then((user) => {
            const token = jwt.sign(
                {
                    _id: user._id,
                    role: user.role
                },
                NODE_ENV === 'production' ? JWT_PROD : JWT_DEV,
                { expiresIn: '7d' }
            );
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .send({
                _id: user._id,
                login: user.login,
                role: user.role,
                name: user.name,
                surName: user.surName,
                middleName: user.middleName,
            })
        })
        .catch(() => {
            next(new BadAuthError(ERRORS_MESSAGE.badAuth.messageUncorrectedData))
        })
}

module.exports.logout = (req, res) => {
    res.clearCookie('token')
}

module.exports.registerStaff = (req, res, next) => {
    const { login, password, surName, name, middleName, role } = req.body
    return bcryptjs.hash(password, 10)
        .then((hash) => Staff.create({ login, password: hash, surName, name, middleName, role }))
        .then((user) => {
            res.send({
                login: user.login,
                _id: user._id,
                surName: user.surName,
                name: user.name,
                middleName: user.middleName,
                role: user.role,
            })
        })
        .catch((err) => {
            if (err.name === 'ValidationError') {
                return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData));
            }
            if (err.code === 11000) {
                return next(new ExistLoginError(ERRORS_MESSAGE.existConflict.messageDefault));
            }
            return next(err);
        })
}

module.exports.getStaffOnce = (req, res, next) => {
    Staff.findOne({ _id: req.user._id, role: req.user.role })
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((staff) => {
            res.send(staff)
        })
        .catch((err) => next(err))
}

module.exports.getStaffAll = (req, res, next) => {
    Staff.find({})
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUsers))
        .then((staff) => {
            res.send(staff)
        })
        .catch((err) => next(err))
}

module.exports.updateStaff = (req, res, next) => {
    const { surName, name, middleName } = req.body;
    Staff.findByIdAndUpdate(
        req.params.id,
        { surName, name, middleName },
        {
            new: true,
            runValidators: true,
        }
    )
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((staff) => {
            res.send(staff)
        })
        .catch((err) => next(err))
}

module.exports.deleteStaff = (req, res, next) => {
    const { id } = req.params
    const { role } = req.body
    role==='doctor' ?
    Staff.findByIdAndRemove(id)
        .orFail(new NotFoundError(ERRORS_MESSAGE.notFound.messageSearchUser))
        .then((user) => {
            res.send(user)
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return next(new BadRequestError(ERRORS_MESSAGE.badRequest.messageUncorrectedData));
            }
            return next(err);
        })
    : 
    next(new PermissionError(ERRORS_MESSAGE.permissionConfilct.messageDefault))
}