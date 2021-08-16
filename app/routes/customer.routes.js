/**
* router
*/
var router = require("express").Router();
const authorize = require('../middleware/authorize')
const customer = require("../controllers/customer.controller");

//create 
router.post("/", authorize(), customer.createCustomer);
// Retrieve all
router.get("/", authorize(), customer.getAllCustomer);
// Retrieve customer by Id
router.get("/:id", authorize(), customer.getCustomerById);
// Update Customer with id
router.put("/:id", authorize(), customer.updateCustomer);
// Delete Customer with id
router.delete("/:id", authorize(), customer.delete);

module.exports = router;