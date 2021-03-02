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

  module.exports = {
      create,
      getAll,
      getOne
  }