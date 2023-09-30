const router = require('express').Router();
const patient = require('./patient')
const staff = require('./staff')

router.use('/patient', patient)
router.use('/staff', staff)

router.use('*', (req, res, next) => {
    next(new Error('Страница не найдена'))
})

module.exports = router