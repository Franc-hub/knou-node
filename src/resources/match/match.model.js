const mongoose = require('mongoose');
const chatModel = require('../chat/chat.model');

//Define model schema
const MatchSchema = mongoose.Schema({
  userOne: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  userTwo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  created: mongoose.Schema.Types.Date,
  active: mongoose.Schema.Types.Boolean,
  updated: mongoose.Schema.Types.Date,
});

const Match = mongoose.model('MatchModel', MatchSchema);

//create
const create = async (match) => {
  let matchId = '';
  return await Match.create(match, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
      matchId = docs._id;
      console.log(matchId);
      const newChat = {
        match: matchId,
      };
      chatModel.create(newChat);

      return docs;
    }
  });
};

//get (get one)
const get = async (id) => {
  let query = { _id: id };
  return await Match.findOne(query); /* .populate('giving', 'receiving'); */
};

//get (get all)
const all = async () => {
  return await Match.find(); /* .populate('giving', 'receiving'); */
};
// update
const update = (id, updateMatch) => {
  let query = { _id: id };
  Match.updateOne(query, updateMatch, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

const allMatchesOfUserId = async (id) => {
  let query = { userOne: id };
  return await Match.find(query).populate('userTwo', 'firstname');
};

module.exports = {
  create,
  get,
  all,
  update,
  Match,
  allMatchesOfUserId,
};
