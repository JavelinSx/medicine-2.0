const router = require('express').Router();
const patient = require('./patient')

router.use('/patient', patient)

router.use('*', (req, res, next) => {
    next(new Error('Страница не найдена'))
})

module.exports = router