"use strict";
const router = require("express").Router();
const deliveryController = require("../../app/deliveries/DeliveryController");
const deliveryValidator = require("../../app/deliveries/DeliveryValidator");

 router.get("/", deliveryController.getallDelivery);
 router.get("/:id", deliveryController.getDeliveryById);
 router.post("/", deliveryValidator.createDelivery,deliveryController.createDelivery);
 router.put("/:id", deliveryController.updateDelivery);
 router.delete("/:id",deliveryController.deleteDelivery);
module.exports = router;
