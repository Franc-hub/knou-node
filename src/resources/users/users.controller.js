const userModel = require('./users.model');

const { validationResult } = require('express-validator');



//create user
const create = (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Received validation errors', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  const newuser = req.body;
  const usersUpdated = userModel.create(newuser);
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
  const usersUpdated = userModel.update(req.params.id, updateduser);
  return res.status(200).json(usersUpdated);
};

//remove user
const remove = (req, res) => {
  const usersWithoutTheDeleted = userModel.remove(req.params.id);
  return res.status(200).json(usersWithoutTheDeleted);
};

// const getRandom = async (req, res) => {
//   const random = await userModel.randomUser();
//   return res.status(200).json(random);
// };

const getUsersByPreferences = async (req, res) => {
  const sexualOrientation = req.body.orientation;
  const gender = req.body.gender;
  const ageRange = req.body.age_range;
  const userId = req.params.id

  const matchedUsers = await userModel.getByPreferences(
    gender,
    sexualOrientation,
    ageRange,
    userId
  );
  return res.status(200).json(matchedUsers);
};



module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
  getUsersByPreferences,
  // getRandom,
};
