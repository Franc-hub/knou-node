const photoModel = require('./photo.model');



const uploadPhoto = async (req, res) => {
    const imgToUpload = await photoModel.createPhoto({
        photo: req.file.buffer,
        user: req.params.userId,
        name: req.file.name,
        size: req.file.size,
        mimetype: req.file.mimetype,
    });
    const photos = await photoModel.getUserPhotos(req.params.userId);
    // Iterate over each image to convert the buffer array into a base64 string
    all = photos.map((photo) => {
        return {
            image: photo.photo.toString('base64'),
            id: photo._id
        };
    });
    console.log(all.length);

    return res.status(200).json(all);
};
const getByUser = async (req, res) => {
  const photos = await photoModel.getUserPhotos(req.params.userId);

  if (photos) {
    console.log(photos);
    return res.status(200).json(photos);
  }
  return res.status(404).end();
};

const eliminatePhoto = async (req, res) => {
    await photoModel.removePhoto(req.params.photoId);
    const photoWithoutTheDeleted = await photoModel.getUserPhotos(req.params.userId)
    all = photoWithoutTheDeleted.map((photo) => {
        return {
            image: photo.photo.toString('base64'),
            id: photo._id
        };
    });
    console.log(all.length);

    return res.status(200).json(all);
};

module.exports = {
    uploadPhoto,
    getByUser,
    eliminatePhoto
};