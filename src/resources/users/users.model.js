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
    location: mongoose.Schema.Types.Array,
    distance_range: mongoose.Schema.Types.Number,
    hobbies: mongoose.Schema.Types.Array,
    photos: mongoose.Schema.Types.Array,
    created: mongoose.Schema.Types.Date, //created_add
    updated: mongoose.Schema.Types.Date,  //updated_add
    signup_step: mongoose.Schema.Types.Number,
    signup_completed: mongoose.Schema.Types.Boolean,
});
const PhotoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    photo: mongoose.Schema.Types.Buffer,
    updated: mongoose.Schema.Types.Date,
    created: mongoose.Schema.Types.Date
});

const Photo = mongoose.model('PhotoModel',PhotoSchema);
const User = mongoose.model('UserModel', UserSchema);

//create
const create = async (user) => {
    return await User.create(user, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Created Docs : ', docs);
            return docs;
        }
    });
};

const createImage = async (photo) => {
    return await Photo.create(photo, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Created Docs : ', docs);
            return docs;
        }
    });
}

const getImages = async (user) =>{
    let query = { user: user };
    return await Photo.find(query)
}
//get (get one)
const get = async (id) => {
    let query = { _id: id };
    return await User.findOne(query)
};

//get (get all)
const all = async () => {
    return await User.find()
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


module.exports = {
    create,
    createImage,
    get,
    all,
    update,
    remove,
    getImages,
    User,
    Photo
};