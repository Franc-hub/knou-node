const mongoose = require('mongoose');

// Define model schema
const MessageSchema = {
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
    created: mongoose.Schema.Types.Date,
  },
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatModel',
  },
  content: mongoose.Schema.Types.String,
  order: mongoose.Schema.Types.Number,
  date: { type: Date, default: Date.now },
};

const Message = mongoose.model('MessageModel', MessageSchema);

//create
const create = async (message) => {
  return await Message.create(message, function (err, docs) {
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
  return await Message.findOne(query);
};

//get (get all)
const all = async () => {
  return await Message.find();
};

const allMessagesByChatId = async (id) => {
  let query = { chat: id };
  return await Message.find(query);
};

const lastMessageOfChatId = async (id) => {
  let query = { chat: id };
  return await Message.find(query).sort({ date: -1 }).limit(1);
};

module.exports = {
  create,
  get,
  all,
  Message,
  allMessagesByChatId,
  lastMessageOfChatId,
};
