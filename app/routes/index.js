module.exports = app => {
    app.use('/api/users', require("./user.routes"));
    app.use('/api/auth', require("./auth.routes"))
    app.use('/api/images', require("./image.routes"))
    app.use('/api/customer', require("./customer.routes"))
}