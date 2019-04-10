const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-nefw9.mongodb.net/rocketbox?retryWrites=true',
  {
    useNewUrlParser: true,
  },
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require('./routes'));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
server.listen(3001, () => {
  console.log('Server in the port 3001');
});
