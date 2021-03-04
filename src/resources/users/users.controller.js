const userModel = require('./users.model');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const upload = multer();

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
  req.params.distance_range
  const user = await userModel.get(req.params.id);
  const matchedUsers = await userModel.getByPreferences(
    user.gender,
    user.orientation,
    user.age_range,
    user.location.coordinates,
    user.distance_range
  );
  return res.status(200).json(matchedUsers);
};

const uploadPhoto = async (req, res) => {
  const imgToUpload = await userModel.createImage({
    photo: req.file.buffer,
    user: req.params.id,
    name: req.file.name,
    size: req.file.size,
    mimetype: req.file.mimetype,
  });

  const photos = await userModel.getImages(req.params.id);

  // Iterate over each image to convert the buffer array into a base64 string
  all = photos.map((photo) => {
    return {
      image: photo.photo.toString('base64'),
    };
  });
  console.log(all);

  return res.status(200).json(all);
};

//updated photos
/* const updatePhotos = async (req, res) => {
    const imagesToUpload = req.files.map(image => {
        return {
            image: image.buffer,
            mimetype: image.mimetype
        }
    })
    // Save all the Images in the array with insertMany()
    userModel.Photo.updateOne({ 'photoUpload': imagesToUpload  }, (err, imagesToUpload) => {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(200).send(imagesToUpload);
        }
    }); */

const getByUser = async (req, res) => {
  const photos = await userModel.getImages(req.params.id);
  if (photos) {
    console.log(photos);
    return res.status(200).json(photos);
  }
  return res.status(404).end();
};

const createGeoLocation = async (req, res) => {
  const newgeo = req.body;
  const geoUpdated = await User.createGeo(geoUpdated);
  return res.status(201).json(newgeo);
};


/*  const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: "dcxuyxqvo", 
    api_key: '387288113589199', 
    api_secret: '7FCU8VfE3k6IB2oyHxdtts5K9Bo' 
  });

  const responses = [];

  req.files.forEach(async file => {
      try {
          console.log(`data:${file.mimetype};base64,` + file.buffer.toString('base64'))
        const result = await cloudinary.uploader.unsigned_upload(`data:${file.mimetype};base64,` + file.buffer.toString('base64'), '', '') ;
      } catch (e) {
          console.log(e.text)
      }
    responses.push(result);
  })

  console.log(responses); */

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
  getUsersByPreferences,
  uploadPhoto,
  getByUser,
  createGeoLocation
  // getRandom,
};
