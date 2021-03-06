const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorHandler = require('../middleware/error-handler');

const db = require("../models");

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    createUser,
    getUserByPK
};

async function authenticate({ user_name, password },) {
    let res = {
        result: 0,
        data: null
    }
    const user = await db.User.findOne({ where: { user_name } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        res = {
            result: 1,
            data: 'Username or password is incorrect'
        }
        return res
        // errorHandler('Username or password is incorrect', res)
    }//throw 'Username or password is incorrect';

    // authentication successful
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
    res = {
        result: 0,
        data: { ...omitHash(user.get()), token }
    }
    return res;
}

async function getAll() {
    return await db.User.findAll();
}

async function getById(id) {
    return await getUser(id);
}
async function createUser(params) {
    let data = {
        user_name: params.userName,
        name: params.name,
        email: params.email,
        password: params.password,
        role: params.role,
        status: params.status,
        photo: params.photo
    }
    if (await db.User.findOne({ where: { user_name: data.user_name, email: data.email } })) {

        return {
            result: 1,
            data: 'Username or Email "' + '" is already taken'
        }
        // errorHandler('Username "' + params.user_name + '" is already taken')
        // throw 'Username "' + params.user_name + '" is already taken';
    }
    // hash password
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    // save user
    let user = await db.User.create(data);
    if (user) {
        return {
            result: 0,
            data: user
        }
    } else {
        return {
            result: 1,
            data: "User create Error"
        }
    }

}

async function create(params) {
    let res = {
        result: 0,
        data: null
    }
    // validate
    if (await db.User.findOne({ where: { user_name: params.user_name } })) {
        res = {
            result: 1,
            data: 'Username "' + params.user_name + '" is already taken'
        }
        return res
        // errorHandler('Username "' + params.user_name + '" is already taken')
        // throw 'Username "' + params.user_name + '" is already taken';
    }

    // hash password
    if (params.password) {
        params.password = await bcrypt.hash(params.password, 10);
    }

    // save user
    let user = await db.User.create(params);
    
    return user
}

async function update(id, params, res) {
    
    // hash password if it was entered
    if (params.password) {
        params.hash = await bcrypt.hash(params.password, 10);
    }

    let result = db.User.update(params, {
        where: { id: id }
    })   

    return result
}

async function _delete(id) {

    let result = await db.User.destroy({
        where: { id: id }
    });

    return result;
    
}

// helper functions

async function getUserByPK(id) {
    return await db.User.findByPk(id)
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user)
        return {
            result: 1,
            data: "User not found"
        }
    // throw 'User not found';
    return {
        result: 0,
        data: user
    };
}

function omitHash(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}