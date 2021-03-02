const chatModel = require('./chat.model');

// create
const create = async (req, res) => {
    const newChat = req.body;
    const chatUpdated = chatModel.create(newChat);
  
    return res.status(201).json(chatUpdated);
  };
  
  //get all
  const getAll = async (req, res) => {
    const chates = await chatModel.all();
    return res.status(200).json(chates);
  };
  // get one
  const getOne = async (req, res) => {
    const chat = await chatModel.get(req.params.id);
    if (chat) {
      return res.status(200).json(chat);
    }
    return res.status(404).end();
  };

  module.exports = {
      create,
      getAll,
      getOne
  }