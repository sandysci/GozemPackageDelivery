'use strict';
const deliveryRespository = require("./DeliveryRepository");



exports.getallDelivery = async (req,res) =>{
    const {data, error} = await deliveryRespository.fetchAllDelivery();
    if(error)
         return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.getDeliveryById = async (req,res) =>{
    const {id} = req.params;
    if(!id) return  errorResponse(res,"id must be passed");

    const {data, error} = await deliveryRespository.fetchByIdDelivery(id);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.createDelivery = async (req,res) =>{


    const {data, error} = await deliveryRespository.createDelivery(req.body);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.updateDelivery = async (req,res) =>{
    const {id} = req.params;
    if(!id) return  errorResponse(res,"id must be passed");

    const {data, error} = await deliveryRespository.updateDelivery(id,req.body);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.deleteDelivery = async (req,res) =>{
    const {id} = req.params;
    if(!id) return  errorResponse(res,"id must be passed");

    const {data, error} = await deliveryRespository.deleteDelivery(id);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};




