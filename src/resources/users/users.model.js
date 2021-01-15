const mongoose = require('mongoose');

// Define model schema
const UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    avatar: String,
    profile: {
        gender: String,
        birthdate: Date,
        location: String,
        hobbies: []
    },
    preferences: {
        gender: String,
        agemargin: [],
        location: String,
        hobbies: []
    }
});

const User = mongoose.model('UserModel', UserSchema);

//create
const create = (user) => {
    User.create(user, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Created Docs : ', docs);
        }
    });
};

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
    get,
    all,
    update,
    remove
};