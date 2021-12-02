"use strict";


const Joi = require("joi");




exports.createDelivery = (req,res,next) => {

    const schema = Joi.object({
        package_id:Joi.required(),
        active_delivery_id: Joi.required(),
        description:Joi.string().required(),
        weight:Joi.number().required(),
        width:Joi.number().required(),
        height:Joi.number().required(),
        depth:Joi.number().required(),
        from_name:Joi.string().required(),
        from_address:Joi.required(),
        from_location:Joi.object({
            latitude: Joi.number().required(),
            longitude:Joi.number().required()
        }).required(),
        to_name:Joi.required(),
        to_address:Joi.required(),
        to_location:Joi.object({
            latitude: Joi.number().required(),
            longitude:Joi.number().required()
        }).required(),

    });
    const result = schema.validate(req.body);


    if(result.error)
        return errorResponse(res, result.error.details[0].message.replace(/['"]/g, ''), 422);

    next();
};






