const { Customer } = require("../models");
const db = require("../models");
const Cusomer = db.Customer;
// add service
exports.addCustomer = async (customer) => {
    let data = await Cusomer.create(customer);

    return data
}
// update service
exports.updateCustomer = async (customer,id) => {
    let data = await Cusomer.update(customer, {
        where: {
            id: id
        }
    })
    return data;
}
// get all service
exports.getAllCustomer = async () =>{
    let {rows:data, count} = await Customer.findAndCountAll({ distinct: true, where: {}})

    return {
        data,count
    }
}
// get one by id
exports.getCustomerById = async (id) => {
    let data = await Cusomer.findByPk(id);
    return data
}
// get by option
exports.getCustomerByOption = async (option) => {
    let {rows: data, count} = await Cusomer.findAndCountAll(option);
    return {data, count}
}
// delete
exports.delete = async (id) => {
    let result = await Customer.destroy({
        where: { id: id }
    });

    return result;
}