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
            name: 'knou proyect'
        },
        subject: 'thank you for choosing knou',
        text: `Hi! dear ${newuser.firstname} welcome to knou`,
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
    user._id,
    user.longitud,
    user.latitud,
    user.distance_range
  );
  return res.status(200).json(matchedUsers);
};

const getDistanceBetweenUsers = async (req, res) =>{
    //source: https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    const lat1 = req.body.point1[0]
    const lon1 = req.body.point1[1]
    const lat2 = req.body.point2[0]
    const lon2 = req.body.point2[1]
    // Converts numeric degrees to radians
    function toRad(Value) {
      return Value * Math.PI / 180;
    }
    let R = 6371; // Radius of earth in km
    let dLat = toRad(lat2-lat1);
    let dLon = toRad(lon2-lon1);
    let latRad1 = toRad(lat1);
    let latRad2 = toRad(lat2);
    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latRad1) * Math.cos(latRad2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return res.json({
      distance: d
    })
}

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
  getUsersByPreferences,
  getDistanceBetweenUsers,
  // getRandom,
};
