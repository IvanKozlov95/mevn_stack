const mongoose		= require('mongoose');

mongoose.connect('mongodb://localhost:27017/demo')
  .then(() => {
    console.log('Connected to mongoose. Uri: mongodb://localhost:27017/demo');
  })
  .catch(console.error);

module.exports = mongoose;