const likeModel = require('./like.model');

const matchModel = require('../match/match.model');

// create
const create = async (req, res) => {
  const newLike = req.body;
  const likeUpdated = likeModel.create(newLike);
  const sender = req.body.sender;
  const receiver = req.body.receiver;

  const match = await likeModel.checkMatch(sender, receiver);

  if (match) {
    const newMatch = {
      userOne: match.sender,
      userTwo: match.receiver, //faltan los otros campos
    };

    const matchCreated = matchModel.create(newMatch);
    console.log(`matched with ${receiver}`);
    return res.status(201).json(newMatch);
  } else {
    console.log('no match, try again...');
  }
  //const match = likeModel.checkMatch;

  return res.status(201).json(likeUpdated);
};

//get all
const getAll = async (req, res) => {
  const likes = await likeModel.all();
  return res.status(200).json(likes);
};
// get one
const getOne = async (req, res) => {
  const like = await likeModel.get(req.params.id);
  if (like) {
    return res.status(200).json(like);
  }
  return res.status(404).end();
};
// update
const update = async (req, res) => {
  const updatedLike = req.body;
  const likeUpdated = await likeModel.update(req.params.id, updatedLike);
  return res.status(200).json(likeUpdated);
};
// remove
const remove = (req, res) => {
  likeModel.delete(req.params.id);
  return res.status(200).json({ message: 'Like deleted' });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
