"use strict";
const Packages = require("./PackageModel");
const Repository = require("../Repository");


class PackageRepository extends Repository{
    constructor(){
        super(Packages);
    }

    async fetchAllPackages(){
        try {
            let data = await this.all();
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