const router = require('express').Router()
const {
    getStaffOnce,
    getStaffAll,
    registerStaff,
    loginStaff
} = require('../controllers/staff')

const { auth } = require('../middlewares/auth')

const { celebrate } = require('celebrate')

const { staffRegisterValidation, staffLoginValidation, staffAuthValidation } = require('../utils/schemaValidationStaff')

router.post('/signin', celebrate(staffLoginValidation), loginStaff)
router.post('/register', celebrate(staffRegisterValidation), registerStaff)
router.use(auth, celebrate(staffAuthValidation))



router.get('/:id', getStaffOnce)
router.get('/all', getStaffAll)

router.post('/signout', (req, res, next) => {
    res.clearCookie('token').send({ logout: "успешный выход" })
})

router.use((err, req, res, next) => {
    if (err.joi) {
        const validationErrors = err.joi.details.map(detail => detail.message);
        return res.status(400).json({ error: 'Validation error', details: validationErrors });
    }
    next(err);
});


module.exports = router