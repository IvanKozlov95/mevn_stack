const mongoose  = require('mongoose');

let closeConnection = () => {
  mongoose.connection.close()
    .then(() => console.log('Connection closed'));
}

let connectMongo = (req, res, next) => {
  let db = mongoose.connect('mongodb://localhost:27017/demo')
    .then(() => console.log('Connected to mongo'))
    .catch((err) => next(err));

  res.on('finish', closeConnection);
  res.on('close', closeConnection);

  next();
}

module.exports = {
  connectMongo: connectMongo
}