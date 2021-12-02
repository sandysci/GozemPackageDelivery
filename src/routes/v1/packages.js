"use strict";
const router = require("express").Router();
const packageController = require("../../app/packages/PackageController");
const packageValidator = require("../../app/packages/PackageValidator");

 router.get("/", packageController.getallPackages);
 router.get("/:id", packageController.getPackageById);
 router.post("/", packageValidator.createDelivery,packageController.createPackage);
 router.put("/:id", packageController.updatePackage);
 router.delete("/:id",packageController.deletePackage);
module.exports = router;
