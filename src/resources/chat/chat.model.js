const mongoose = require('mongoose');

// Define model schema

const ChatSchema = ({
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MatchModel',
    },
    updated: mongoose.Schema.Types.Date,
    created: mongoose.Schema.Types.Date,
})

const Chat  = mongoose.model('ChatModel',ChatSchema);

//create
const create = async (chat) => {
    return await Chat.create(chat, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log('Created Docs : ', docs);
        return docs;
      }
    });
  };

  //get (get one)
const get = async (id) => {
    let query = { _id: id };
    return await Chat.findOne(query);
  };
  
  //get (get all)
  const all = async () => {
    return await Chat.find();
  };

  module.exports = {
    create,
    get,
    all,
    Chat
};