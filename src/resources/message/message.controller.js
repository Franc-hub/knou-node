const messageModel = require('./message.model');
const chatModel = require('../chat/chat.model');

// create
const create = async (req, res) => {
  const newMessage = req.body;

  const messageUpdated = messageModel.create(newMessage);

  return res.status(201).json(messageUpdated);
};

const createByMatchId = async (req, res) => {};

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

const getMessagesByMatchId = async (req, res) => {
  const matchId = req.params.id;
  const chat = await chatModel.chatsByMatchId(matchId);
  const messages = await messageModel.allMessagesByChatId(chat);
  return res.status(200).json(messages);
};

const getLastMessageByMatchId = async (req, res) => {
  const matchId = req.params.id;
  const chat = await chatModel.chatsByMatchId(matchId);
  const message = await messageModel.lastMessageOfChatId(chat);
  return res.status(200).json(message);
};

//const getLastMessage;

module.exports = {
  create,
  getAll,
  getOne,
  getMessagesByMatchId,
  getLastMessageByMatchId,
};
