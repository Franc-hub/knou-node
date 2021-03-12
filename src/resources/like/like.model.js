const mongoose = require('mongoose');

//Define model schema
const LikeSchema = mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  created: mongoose.Schema.Types.Date,
});

const Like = mongoose.model('LikeModel', LikeSchema);

//create
const create = async (like) => {
  return await Like.create(like, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
      return docs;
    }
  });
};

// Premium

//get (get one)
const get = async (id) => {
  let query = { _id: id };
  return await Like.findOne(query); /* .populate('giving', 'receiving'); */
};

//get (get all)
const all = async () => {
  return await Like.find(); /* .populate('giving', 'receiving'); */
};
// update
const update = (id, updateLike) => {
  let query = { _id: id };
  Like.updateOne(query, updateLike, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

const checkMatch = async (senderId, receiverId) => {
  let query = { sender: receiverId, receiver: senderId };
  return await Like.findOne(query);
};

module.exports = {
  create,
  get,
  all,
  update,
  checkMatch,
  Like,
};
