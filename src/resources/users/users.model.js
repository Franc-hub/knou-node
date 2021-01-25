const mongoose = require('mongoose');

// Define model schema
const UserSchema = mongoose.Schema({
    account: {
        username: mongoose.Schema.Types.String,
        email: mongoose.Schema.Types.String,
        password: mongoose.Schema.Types.String,
        created: mongoose.Schema.Types.Date,
        premium: mongoose.Schema.Types.Boolean,
    },
    profile: {
        firstname: mongoose.Schema.Types.String,
        lastname: mongoose.Schema.Types.String,
        birthdate: mongoose.Schema.Types.Date,
        description: mongoose.Schema.Types.String,
        gender: mongoose.Schema.Types.String,
        photos: mongoose.Schema.Types.Array,
        hobbies: mongoose.Schema.Types.Array,
        location: mongoose.Schema.Types.Array
    },
    preferences: {
        orientation: mongoose.Schema.Types.String,
        agerange: mongoose.Schema.Types.Array,
        distance: mongoose.Schema.Types.Number,
        hobbies: mongoose.Schema.Types.Array
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
    remove,
    User
};