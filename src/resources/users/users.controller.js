const userModel = require('./users.model');

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
      name: 'Knou',
    },
    subject: 'Welcome to Knou',
    html: `<html lang="en">
        <body>
            <h2 style="color:#8c30f5;font-weight: bold;font-size:30px; font-style: oblique;">Hi ${newuser.firstname}!</h2>
              <div style="width:100%">
              <p style="font-size:22px;">We would like to welcome you to <span style="color:#8c30f5;font-weight: bold;font-size:30px; font-style: oblique;">Knou</span>, 
              the best webApp to meet new people from over the world.</p>
              <br></br>
              <p style="font-size:22px;">Please follow the next link to finish your profile and confirm your account!</p>
              <br></br>
              <a href="https://hardcore-hawking-033be2.netlify.app" target="_blank" style="width:100%;height:200px;padding-top:20px;padding-bottom: 20px;padding-left: 10px;padding-right: 10px;  text-decoration: none;font-size: 22px;font-weight:bold; font-style:oblique; background:  #DED3FF;color:#8c30f5 ; border-radius:30px">
              Click here to<span style="color:#8c30f5 ;font-weight:bolder; font-style: normal;"> Knou </span> people
            </a>
            <br></br>
              <br></br>
            <a href="https://hardcore-hawking-033be2.netlify.app" target="_blank">
                <img src="https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/11010960_1086490394699437_1303021328945486501_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=ba80b0&_nc_ohc=nJ4lKu9VJDUAX9R8RZ5&_nc_ht=scontent-mad1-1.xx&oh=3da5b1b187515d523bb3cfc002f6f9aa&oe=6079F27B" alt="logo" style="width:200px;height:200px">
              </a>
              <footer style="margin-top: 200px;">
                <span style="color:#4F4F4F;"> © 2020 Knou. All rights reserved</span> 
            </footer>
            </div>
        </body>
        </html>
        
        `,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
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
const update = async (req, res) => {
  const updateduser = req.body;
  const usersUpdated = await userModel.update(req.params.id, updateduser);
  console.log('usersss' + usersUpdated)
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
