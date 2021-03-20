const mongoose = require('mongoose');
const matchModel = require('../match/match.model');

// Define model schema
const UserSchema = mongoose.Schema({
  firstname: mongoose.Schema.Types.String,
  lastname: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  premium: mongoose.Schema.Types.Boolean,
  age: mongoose.Schema.Types.Number,
  age_range: mongoose.Schema.Types.Array,
  gender: mongoose.Schema.Types.String,
  orientation: mongoose.Schema.Types.String,
  description: mongoose.Schema.Types.String,
  location: mongoose.Schema.Types.Array,
  distance_range: mongoose.Schema.Types.Number,
  hobbies: mongoose.Schema.Types.Array,
  photos: {
    type: mongoose.Schema.Types.ObjectId && Array,
    ref: 'PhotoModel',
  },
  created: mongoose.Schema.Types.Date,
  updated: mongoose.Schema.Types.Date,
  signup_step: mongoose.Schema.Types.Number,
  signup_completed: mongoose.Schema.Types.Boolean,
});

const User = mongoose.model('UserModel', UserSchema);

//create
const create = async (user) => {
  return await User.create(user, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
      return docs;
    }
  });
};

//get (get one)
const get = async (id) => {
  let query = { _id: id };
  return await User.findOne(query);
};

//get (get all)
const all = async () => {
  return await User.find();
};

//update
const update = (id, updateduser) => {
  let query = { _id: id };
  User.updateOne(query, updateduser, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

//remove
const remove = (id) => {
  let query = { _id: id };
  User.deleteOne(query, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted Docs : ', docs);
    }
  });
};

const getByPreferences = async (gender, orientation, ageRange, userId) => {
  const [lowerAge, higherAge] = ageRange;

  const userMatches = await matchModel.allMatchesOfUserId(userId);

  console.log(userMatches);

  let ids = [];

  if (userMatches) {
    userMatches.map((users) => {
      ids.push(users.userOne._id, users.userTwo._id);
    });
  }

  const blackList = [userId];

  if (ids.length > 1) {
    ids.map((id) => {
      blackList.push(id);
    });
  }

  console.log(blackList);

  //el blacklist depende si tienes match, hay que añadir el userId al blacklist y ya estaria.

  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value.toHexString()) === index;
  // }

  //funciona pero se repite el ID del usuario, falta quitarlo .!! !! ! !! ! !

  let query = {
    gender: gender,
    orientation: orientation,
    age: { $gt: lowerAge, $lt: higherAge },
    _id: { $not: { $in: userId } },

    //faltan por localizacion y rango
  };

  if (orientation === 'heterosexual') {
    if (gender === 'male') {
      gender = 'female';
    } else {
      gender = 'male';
    }
    query.gender = gender;
    return User.find(query);
  } else if (orientation === 'homosexual') {
    return User.find(query);
  } else {
    return User.find({
      orientation: { $in: ['homosexual', 'heterosexual', 'bisexual'] },
      age: { $gt: lowerAge, $lt: higherAge },
      _id: { $not: { $in: blackList } },
    });
  }
};

const getEmail = async (email) => {
  let query = { email: email };
  return await User.findOne(query);
};

module.exports = {
  create,
  get,
  all,
  update,
  remove,
  getByPreferences,
  getEmail,
  User,
};
