const mongoose = require('mongoose');

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

const Photo = mongoose.model('PhotoModel', PhotoSchema);
const createPhoto = async (photo) => {
    const picture = await Photo.create(photo);
    return picture;
};

const getUserPhotos = async (user) => {
    let query = { user: user };
    const pictures =  await Photo.find(query);
    return pictures;
};

const removePhoto = async (photoId) => {
    let query = { _id: photoId };
     await Photo.deleteOne(query);
};

module.exports = {
    createPhoto,
    getUserPhotos,
    removePhoto,
    Photo
};