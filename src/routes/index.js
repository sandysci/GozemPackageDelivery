var express = require('express');
var router = express.Router();

/* GET base route. */
router.get('/', function(req, res, next) {
  res.json( {title: `Gozem Backend Package Delivery`});
});


router.use("/package", require("./v1/packages"));
router.use("/delivery", require("./v1/deliveries"));


module.exports = router;
