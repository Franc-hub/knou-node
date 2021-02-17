const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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
  photos: mongoose.Schema.Types.Array,
  created: mongoose.Schema.Types.Date,
  updated: mongoose.Schema.Types.Date,
  signup_step: mongoose.Schema.Types.Number,
  signup_completed: mongoose.Schema.Types.Boolean,
});

UserSchema.pre('save', async function (next) {
  //antes de cada save, se ejecuta esto, ,por esto el pre.
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
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

const login = async (email, password) => {
  //buscador de correos y comparador de password normal con la encryptada.
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

module.exports = {
  create,
  get,
  all,
  update,
  remove,
  login,
  User,
};
