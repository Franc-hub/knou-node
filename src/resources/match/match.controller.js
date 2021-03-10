const matchModel = require('./match.model');
const userModel = require('../users/users.model');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_API_KEY);
// create
const create = async (req, res) => {
  const newMatch = req.body;
  const matchUpdated = matchModel.create(newMatch);
  const userOne =userModel.get(req.body.userOne) ;
  const userTwo =userModel.get(req.body.userTwo) ;
  let msg = {
    to: userOne.email,
    from: {
        email: 'raul.salcedo03@hotmail.com',
        name: 'knou proyect'
    },
    subject: 'You have a new match',
    text: `Hi! dear ${userOne.firstname} someone want to knou xd you`, //here we need a post the url of cloud aplication
};
sgMail.send(msg)
.then(()=> {
    console.log('Email sent');
})
.catch ((error) => {
    console.log(error);
});
 msg = {
  to: userTwo.email,
  from: {
      email: 'raul.salcedo03@hotmail.com',
      name: 'knou proyect'
  },
  subject: 'You have a new match',
  text: `Hi! dear ${userTwo.firstname} someone want to knou xd you`, //here we need a post the url of cloud aplication
};
sgMail.send(msg)
.then(()=> {
  console.log('Email sent');
})
.catch ((error) => {
  console.log(error);
});
  return res.status(201).json(matchUpdated);

};

//get all
const getAll = async (req, res) => {
  const matches = await matchModel.all();
  return res.status(200).json(matches);
};
// get one
const getOne = async (req, res) => {
  const match = await matchModel.get(req.params.id);
  if (match) {
    return res.status(200).json(match);
  }
  return res.status(404).end();
};
// update
const update = async (req, res) => {
  const updatedMatch = req.body;
  const matchUpdated = await matchModel.update(req.params.id, updatedMatch);
  return res.status(200).json(matchUpdated);
};
// remove
const remove = (req, res) => {
  matchModel.delete(req.params.id);
  return res.status(200).json({ message: 'Match deleted' });
};

const getMatchesById = async (req, res) => {
  const matchesOfUser = await matchModel.allMatchesOfUserId(req.params.id);
  return res.status(200).json(matchesOfUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
  getMatchesById,
};
