
module.exports = ((err, req, res, next) => {
    const error = err.details?.get('body')
    if (error) {
        const validationErrors = error.details[0].message;
        const errorResponse = {
            error: 'Validation error',
            details: validationErrors,
        };
        return res.status(400).json(errorResponse);
    }
    next(err);
});