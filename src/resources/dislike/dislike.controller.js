const dislikeModel = require('./dislike.model');
// create 
const create = (req, res) => {
  const newDislike = req.body;
  const dislikeUpdated = dislikeModel.create(newDislike);
  return res.status(201).json(dislikeUpdated);
};

//get all
const getAll = async (req, res) => {
  const dislike = await dislikeModel.all();
  return res.status(200).json(dislike);
};
// get one
const getOne = async (req, res) => {
  const dislike = await dislkeModel.get(req.params.id);
  if (dislike) {
    console.log('giving', giving);
    return res.status(200).json(dislike);
  }
  return res.status(404).end();
};
// update
const update = async (req, res) => {
  const updatedDislike = req.body;
  const dislikeUpdated = await dislkeModel.update(req.params.id, updatedDislike);
  return res.status(200).json(dislikeUpdated);
};
// remove
const remove = (req, res) => {
  dislikesModel.delete(req.params.id);
  return res.status(200).json({ message: 'Dislike deleted' });
};



module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,

}