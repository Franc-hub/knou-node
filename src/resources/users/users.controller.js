const userModel = require('./users.model');
const logo = './assets/image2.png';

const { validationResult } = require('express-validator');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_API_KEY);
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
  const msg = {
        to: newuser.email,
        from: {
            email: 'raul.salcedo03@hotmail.com',
            name: 'Knou'
        },
        subject: 'Welcome to Knou',
        // text: `Hi! 
        //   Dear ${newuser.firstname}! We would like to welcome to Knou, the best webApp
        //   to meet new people from over the world.`,
        html:`<h2>Hi ${newuser.firstname}!</h2>
        <br></br>
        <div style="width:60%; display:flex; flex-direction:column; justify-content:center; align-items:center">
          <p>We would like to welcome you to <span style="color:#8c30f5;font-weight: bold">Knou</span>, 
          the best webApp to meet new people from over the world.</p>
          <p>Please follow the next link to finish your profile and confirm your account!</p>
          <a href="https://www.youtube.com">
            <img src=${logo} alt="logo" style=""width:200px;height:200px>
          </a>
          <p style="font-weight:bold; font-style:oblique; background:#8c30f5;color:#DED3FF; border-radius:30px">New people is waiting to 
          <span style="color:#8c30f5;font-weight:bold">Knou</span> you</p>
        </div>
        `
        
    };
    sgMail.send(msg)
    .then(()=> {
        console.log('Email sent');
    })
    .catch ((error) => {
        console.log(error);
    });
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
  const userId = req.params.id;

  const user = await userModel.get(userId);

  const matchedUsers = await userModel.getByPreferences(
    user.gender,
    user.orientation,
    user.age_range,
    user._id
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
