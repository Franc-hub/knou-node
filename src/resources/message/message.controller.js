const messageModel = require('./message.model');

// create
const create = async (req, res) => {
  const newMessage = req.body;
  const messageUpdated = messageModel.create(newMessage);

  return res.status(201).json(messageUpdated);
};

//get all
const getAll = async (req, res) => {
  const messagees = await messageModel.all();
  return res.status(200).json(messagees);
};
// get one
const getOne = async (req, res) => {
  const message = await messageModel.get(req.params.id);
  if (message) {
    return res.status(200).json(message);
  }
  return res.status(404).end();
};

const getMessagesByChatId = async (req, res) => {
  const chatId = req.params.id;
  const messages = await messageModel.allMessagesByChatId(chatId);
  return res.status(200).json(messages);
};

module.exports = {
  create,
  getAll,
  getOne,
  getMessagesByChatId,
};
