import BaseJoi from 'joi';
import DateExtension from 'joi-date-extensions';
const Joi = BaseJoi.extend(DateExtension);

export var validateBody = (schema) => {
    return (req, res, next) => {
        const result = req.method != 'GET' ? Joi.validate(req.body, schema) : Joi.validate(req.query, schema);
        if (result.error) {
            return res.status(400).json(result.error);
        }

        if (!req.value) { req.value = {}; }
        req.value['body'] = result.value;
        next();
    }
}

export var schemas = {
    registerSchema: Joi.object().keys({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phoneNo: Joi.number().required(),
        address: Joi.string().required(),
        role: Joi.string().required(),
        verify: Joi.string().required()
    }),
    loginSchema: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),
    userCheckSchema: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
    sendResetPassword: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
    resetPassword: Joi.object().keys({
        email: Joi.string().email().required(),
        verificationCode: Joi.string().required(),
        password: Joi.string().required()
    }),
    supplierDetails: Joi.object().keys({
        storename: Joi.string().required(),
        status: Joi.number().required(),
        shopaddress: Joi.string().required(),
        shopdesc: Joi.string().required(),
        ownername: Joi.string().required(),
        owneraddress: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        areaId: Joi.number().required()
    }),
    category: Joi.object().keys({
        name: Joi.string().required(),
        slug: Joi.string().required(),
    }),
    location: Joi.object().keys({
        name: Joi.string().required(),
        status: Joi.number().required(),
    }),
    area: Joi.object().keys({
        name: Joi.string().required(),
        locationId: Joi.number().required(),
        status: Joi.number().required(),
    }),
}