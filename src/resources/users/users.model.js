const mongoose = require('mongoose');

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
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GeoModel',
  },
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


const GeoSchema = mongoose.Schema({
  geometry:{
    type:{
      type: String,
      default: "Point"
    },
    coordinates:{
      type: [Number],
      index: "2dsphere"
    }
  }
});

const PhotoSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  photo: mongoose.Schema.Types.Buffer,
  name: mongoose.Schema.Types.String,
  size: mongoose.Schema.Types.Number,
  mimetype: mongoose.Schema.Types.String,
  updated: mongoose.Schema.Types.Date,
  created: mongoose.Schema.Types.Date,
});
const Geo = mongoose.model('GeoModel', GeoSchema);
const Photo = mongoose.model('PhotoModel', PhotoSchema);
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

const createImage = async (photo) => {
  return await Photo.create(photo, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
      return docs;
    }
  });
};

const createGeo = async (photo) => {
  return await Geo.create(photo, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
      return docs;
    }
  });
};

const getImages = async (user) => {
  let query = { user: user };
  return await Photo.find(query);
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

const getByPreferences = (gender, orientation, ageRange,location) => {
  const [lowerAge, higherAge] = ageRange;
  let geoQuery = User.find({location:{$near:{$geometry:{geometry:{coordinates:{type:['${location}']}}}}}});
  geoquery.location;
  let query = {
    gender: gender,
    orientation: orientation,
    age: { $gt: lowerAge, $lt: higherAge },
    //faltan por localizacion y rango
  };

  if (orientation === 'heterosexual') {
    //let gender = 'male' ? 'female' : 'male'; //no sirve con mujeres la conversion.
    //por que la ternaria no sirve?? solo entra la primera condicio.
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
    });
  }
};

module.exports = {
  create,
  get,
  all,
  update,
  remove,
  getByPreferences,
  User,
  createImage,
  getImages,
  Photo,
  createGeo,
  Geo
};
