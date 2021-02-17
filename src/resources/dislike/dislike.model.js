const mongoose = require('mongoose');

//Define model schema 
const DislikeSchema = mongoose.Schema({

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    receiver
        : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
    },
    created: mongoose.Schema.Types.Date
});

const Dislike = mongoose.model('DislikeModel', DislikeSchema);

//create
const create = async (dislike) => {
    return await Dislike.create(dislike, function (err, docs) {
        if (err) {
            console.log(err)
        }
        else {
            console.log('Created Docs : ', docs);
            return docs;
        }
    });
};

// Premium

//get (get one)
const get = async (id) => {
    let query = { _id: id };
    return await Dislike.findOne(query)/* .populate('sender', 'reciver'); */
};

//get (get all)
const all = async () => {
    return await Dislike.find()/* .populate('sender', 'reciver'); */
};
// update 
const update = (id, updatedislike) => {
    let query = { _id: id };
    Dislike.updateOne(query, updatedislike, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            console.log('Updated Docs : ', docs);
        }
    });
};


module.exports = {
    create,
    get,
    all,
    update,
    Dislike
};