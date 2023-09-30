const router = require('express').Router()
const {
    getPatient,
    getPatients,
    registerPatient,
    loginPatient,
    updatePatient
} = require('../controllers/patients')
const handleFileUpload = require('../middlewares/multer')
const { auth } = require('../middlewares/auth')

const { celebrate } = require('celebrate')

const { patientRegisterValidation, patientLoginValidation, patientAuthValidation, patientUpdateValidation } = require('../utils/schemaValidationPatient')



router.post('/signin', celebrate(patientLoginValidation), loginPatient)
router.post('/register', celebrate(patientRegisterValidation), registerPatient)
router.get('/get/:id', getPatient)
router.get('/get-all/', getPatients)
router.post('/update/:id', celebrate(patientUpdateValidation), handleFileUpload, updatePatient)
router.use(auth, celebrate(patientAuthValidation))



router.get('/:id', getPatient)
router.get('/all', getPatients)

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