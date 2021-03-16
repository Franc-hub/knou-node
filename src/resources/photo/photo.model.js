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
    return await Photo.create(photo, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Created Docs : ', docs);
            return docs;
        }
    });
};
const getPhoto = async (user) => {
    let query = { user: user };
    return await Photo.find(query);
};

const removePhoto = (user) => {
    let query = { user: user };
    Photo.deleteOne(query, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Deleted Docs : ', docs);
        }
    });
};

module.exports = {
    createPhoto,
    getPhoto,
    removePhoto,
    Photo
};