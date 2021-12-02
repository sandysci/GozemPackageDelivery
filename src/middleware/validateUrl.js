"use strict";


/***
 * Validate url string
 * Ensure it is a valid url
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.validateUrlType = async (req, res, next) => {
    try {
        // checks url name
        let payload =  req?.body?.url;

        if (!payload) return errorResponse(res, "valid url must be passed", 401);


        return next();
    } catch (e) {
        console.log(e.message);
        return errorResponse(res, "Error!!! valid url must be passed", 401);
    }
};

/***
 * Validate url string
 * Ensure it is a valid url
 * @param req
 * @param res
 * @param next
 * @returns {Promise<*>}
 */
exports.validateDataType = async (req, res, next) => {
    try {
        const Joi = require('joi');

        const data = req.body;

        const schema = Joi.object().required();

        const result = schema.validate(data,  {
            allowUnknown: true
        });

        if(result.error)
            return  errorResponse (res,result.error.details[0].message.replace(/['"]/g, ''),401);

        return next();
    } catch (e) {
        console.log(e.message);
        return errorResponse(res, "Error!!! valid data must be passed", 401);
    }
};