const express = require('express');
const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const config = require('./config.js');
const cors = require('cors');
const jwt = require('express-jwt');

const dotenv = require('dotenv');
const mongo = require('./config/mongo');

//routers
const usersRouter = require('./resources/users/users.router');
const authRouter = require('./resources/auth/auth.router');

const dislikeRouter = require('./resources/dislike/dislike.router');
const likeRouter = require('./resources/like/like.router');

const chatRouter = require('./resources/chat/chat.router');
const messageRouter = require('./resources/message/message.router');
const matchRouter = require('./resources/match/match.router');

const photoRouter = require ('./resources/photo/photo.router');


//app
dotenv.config();
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan('dev'));
app.disable('x-powered-by');

//endpoints
app.use('/api/dislike', dislikeRouter);

app.use('/api/like', likeRouter);

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);


app.use('/api/chat', chatRouter);
app.use('/api/messages', messageRouter);
app.use('/api/match', matchRouter);
app.use('/api/photo', photoRouter);

//token
app.get(
  '/protected',
  jwt({ secret: process.env.TOKEN_SECRET, algorithms: ['HS256'] }),
  (req, res) => {
    res.send('protected');
  }
);

//start
const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  start,
  app,
};
