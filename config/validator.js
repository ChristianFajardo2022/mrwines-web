const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        userName: joi.string()
            .max(20)
            .min(3)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'name: min 3 characters',
                'string.max': 'name: max 20 characters'}),
        lastName: joi.string()
            .max(20)
            .min(3)
            .trim()
            .pattern(new RegExp('[a-zA-Z]'))
            .required()
            .messages({
                'string.min': 'last name: min 3 characters',
                'string.max': 'last name: max 20 characters'}),
        userPhoto: joi.string()
            .trim()
//            .domain()
            .required(),
        email: joi.string().email({minDomainSegments:2})
            .required()
            .messages({
                'string.email': 'mail: incorrect format'}),
        password: joi.string()
            .min(8)
            .max(30)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.pattern': 'only lower & UPPER & numbers',
                'string.min': 'password: min 8 characters',
                'string.max': 'password: max 30 characters'}),
        from: joi.string(),
        admin: joi.boolean()
    })
    const validation = schema.validate(req.body.userData, {abortEarly:false})
    if (validation.error) {
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})
    }
    next()
}

module.exports = validator