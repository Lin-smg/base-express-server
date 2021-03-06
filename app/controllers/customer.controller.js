const db = require("../models");

const customerService = require("../services/customer.service")
// create customer
exports.createCustomer = async (req, res) => {
    let { name, phone, address, email, status } = req.body;

    const customer = {
        name: name,
        phone: phone,
        address: address,
        email: email,
        status: status || 1
    }

    let result = await customerService.addCustomer(customer);

    if (result) {
        res.json({
            result: 0,
            data: data,
            message: "create customer successful"
        })
    } else {
        res.json({
            result: 1,
            message: "customer create failed"
        })
    }
}
// update customer
exports.updateCustomer = async (req, res) => {
    const id = req.params.id;
    let data = req.body

    let customer = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        email: data.email,
        status: data.status
    }

    let result = await customerService.updateCustomer(customer, id);
    if (result == 1) {
        res.send({
            result: 0,
            message: "Customer was updated successfully."
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot update Customer with id=${id}. Maybe Customer was not found or req.body is empty!`
        })
    }
}
// get all customer
exports.getAllCustomer = async (req, res) => {
    let {data, count} = await customerService.getAllCustomer();

    if(data) {
        res.json({
            result: 0,
            count: count,
            data: data
        })
    }
}
// get customer using Id
exports.getCustomerById = async (req, res) => {
    const id = req.params.id
    let data = await customerService.getCustomerById(id)

    res.send({
        result: 0,
        data: data
    })
}
// delete customer
exports.delete = async (req, res) => {
    let result = await customerService.delete(req.params.id);

    if (result == 1) {
        res.send({
            result: 0,
            message: "User was deleted successfully!"
        })
    } else {
        res.send({
            result: 1,
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
        })
    }

}