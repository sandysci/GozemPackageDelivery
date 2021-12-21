'use strict';
const packageRespository = require("./PackageRepository");



exports.getallPackages = async (req,res) =>{
    const {data, error} = await packageRespository.fetchAllPackages();
    if(error)
         return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.getPackageById = async (req,res) =>{
    const {id} = req.params;
    if(!id) return  errorResponse(res,"id must be passed");

    const {data, error} = await packageRespository.fetchByPackageId(id);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.createPackage = async (req,res) =>{


    const {data, error} = await packageRespository.createPackages(req.body);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.updatePackage = async (req,res) =>{
    const {id} = req.params;
    if(!id) return  errorResponse(res,"id must be passed");

    const {data, error} = await packageRespository.updatePackages(id,req.body);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};

exports.deletePackage = async (req,res) =>{
    const {id} = req.params;
    if(!id) return  errorResponse(res,"id must be passed");

    const {data, error} = await packageRespository.deletePackages(id);
    console.log("response",error,data);
    if(error)
        return errorResponse(res,error);
    return  successResponse(res,data);
};




