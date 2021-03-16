const photoModel = require('./photo.model');



const uploadPhoto = async (req, res) => {
    const imgToUpload = await photoModel.createPhoto({
        photo: req.file.buffer,
        user: req.params.id,
        name: req.file.name,
        size: req.file.size,
        mimetype: req.file.mimetype,
    });

    const photos = await photoModel.getPhoto(req.params.id);
    // Iterate over each image to convert the buffer array into a base64 string
    all = photos.map((photo) => {
        return {
            image: photo.photo.toString('base64'),
            id:photo._id
        };
    });
    console.log(all);

    return res.status(200).json(all);
};
const getByUser = async (req, res) => {
    const photos = await photoModel.getPhoto(req.params.id);
    if (photos) {
        console.log(photos);
        return res.status(200).json(photos);
    }
    return res.status(404).end();
};
const eliminatePhoto = (req, res) => {
    const photoWithoutTheDeleted = Photo.remove(req.params.id);
    return res.status(200).json(photoWithoutTheDeleted);
  };

module.exports = {
    uploadPhoto,
    getByUser,
    eliminatePhoto
};