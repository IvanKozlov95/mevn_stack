const mongoose  = require('mongoose');
const mongoUri  = (process.env.MONGODB_URI || 'mongodb://localhost:27017/') + 'demo'

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to mongoose. Uri: ' + mongoUri);
  })
  .catch(console.error);

module.exports = mongoose;