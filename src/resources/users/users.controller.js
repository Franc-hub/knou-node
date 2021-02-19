const userModel = require('./users.model')
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
    const usersUpdated = userModel.update(req.params.id, updateduser)
    return res.status(200).json(usersUpdated);
};

//remove user
const remove = (req, res) => {
    const usersWithoutTheDeleted = userModel.remove(req.params.id);
    return res.status(200).json(usersWithoutTheDeleted);
};

const uploadPhoto = async (req, res) => {
    const imgToUpload = await userModel.createImage({
        photo: req.file.buffer,
        user: req.params.id
    });

    console.log(imgToUpload)

    return res.status(200).json(imgToUpload);
}

//updated photos
const updatePhotos = async (req, res) => {
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
    });
}




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
    uploadPhoto
};
