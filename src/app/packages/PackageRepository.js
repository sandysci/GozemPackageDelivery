"use strict";
const Packages = require("./PackageModel");
const Repository = require("../Repository");
const { Binary } = require('mongodb')

class PackageRepository extends Repository{
    constructor(){
        super(Packages);
    }

    async fetchAllPackages(){
        try {
            let data = await this.getModel().aggregate( [
                {
                    $lookup:
                        {
                            from: "deliveries",
                            localField: "package_id",
                            foreignField: "package_id",
                            as: "deliveries"
                        }
                }
            ] );
            return {data}  ;
        }catch (e) {
         return  {error : e.message}
        }
    };

    async fetchByIdPackages(id){
        try {

            let data = await this.findById(id);
            return {data}  ;
        }catch (e) {
            return  {error : e.message}
        }
    };

    async fetchByPackageId(id){
        try {
            const query = {
                "package_id": Binary('lJOTEpmUAAAEAAAAAAAAAA==', '3')
                // "weight": 100,

            };

            let data = await this.getModel().aggregate( [
                {
                    $match: query
                 },
                {
                    $lookup:
                        {
                            from: "deliveries",
                            localField: "package_id",
                            foreignField: "package_id",
                            as: "deliveries"
                        }
                }
            ] );
            return {data}  ;
        }catch (e) {
            return  {error : e.message}
        }
    };

    async createPackages(body){
        try {

            let data = await this.create(body);

            return {data};
        }catch (e) {
            return  {error : e.message}
        }
    };
    async updatePackages(id,body){
        try {
            let data = await  this.updateOrCreate({_id: id}, body);
            return {data};
        }catch (e) {
            return  {error : e.message}
        }
    };

    async deletePackages(id){
        try {
            let data = await  this.deleteMany({_id: id});
            return {data};
        }catch (e) {
            return  {error : e.message}
        }
    };


}

module.exports = (new PackageRepository());