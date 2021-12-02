"use strict";
const Delivery = require("./DeliveryModel");
const Repository = require("../Repository");


class DeliveryRepository extends Repository{
    constructor(){
        super(Delivery);
    }

    async fetchAllDelivery(){
        try {
            let data = await this.all();
            return {data}  ;
        }catch (e) {
         return  {error : e.message}
        }
    };

    async fetchByIdDelivery(id){
        try {
            let data = await this.findById(id);
            return {data}  ;
        }catch (e) {
            return  {error : e.message}
        }
    };

    async createDelivery(body){
        try {

            let data = await this.create(body);

            return {data};
        }catch (e) {
            return  {error : e.message}
        }
    };
    async updateDelivery(id,body){
        try {
            let data = await  this.updateOrCreate({_id: id}, body);
            return {data};
        }catch (e) {
            return  {error : e.message}
        }
    };

    async deleteDelivery(id){
        try {
            let data = await  this.deleteMany({_id: id});
            return {data};
        }catch (e) {
            return  {error : e.message}
        }
    };


}

module.exports = (new DeliveryRepository());