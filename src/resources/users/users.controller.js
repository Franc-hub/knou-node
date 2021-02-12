const userModel = require('./users.model')

//create user
const create = async (req, res) => {
    const newuser = req.body;
    const usersUpdated = await userModel.create(newuser);
    return res.status(201).json(usersUpdated);
};

//get all users
const getAll = async (req, res) => {
    const users = await userModel.all();
    return res.status(200).json(users);
};

//get user by id
const getOne = async (req, res) => {
    const user = await userModel.get(req.params.id);
    if (user) {
        console.log(user);
        return res.status(200).json(user);
    }
    return res.status(404).end();
};

//update user
const update = (req, res) => {
    
    const updateduser = req.body;
    const usersUpdated = userModel.update(req.params.id, updateduser)
    return res.status(200).json(usersUpdated);
};

//remove user
const remove = (req, res) => {
    const usersWithoutTheDeleted = userModel.remove(req.params.id);
    return res.status(200).json(usersWithoutTheDeleted);
};

module.exports = {
    create,
    update,
    getAll,
    getOne,
    remove,
};
