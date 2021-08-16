/**
 * router
 * login
 */

const Auth = require("../controllers/auth.controller.js");

var router = require("express").Router();
// login
router.post('/login', Auth.authSchema, Auth.login);

module.exports = router