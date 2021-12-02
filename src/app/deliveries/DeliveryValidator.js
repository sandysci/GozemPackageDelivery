"use strict";


const Joi = require("joi");




exports.createDelivery = (req,res,next) => {


    const schema = Joi.object({
        delivery_id:Joi.required(),
        package_id: Joi.required(),
        pickup_time: Joi.date().iso().required(),
        start_time: Joi.date().iso().required(),
        end_time : Joi.date().iso().greater(Joi.ref('start_time')).required(),
        location:Joi.object({
            latitude: Joi.number().required(),
            longitude:Joi.number().required()
        }).required(),
        status:Joi.string().valid('open', 'picked-up','in-transit','delivered','failed').required(),

    });
    const result = schema.validate(req.body);


    if(result.error)
        return errorResponse(res, result.error.details[0].message.replace(/['"]/g, ''), 422);

    next();
};






