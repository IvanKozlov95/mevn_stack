const mongoose		= require('mongoose');
let mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/'
mongoUri += 'demo'

mongoose.connect(mongoUri)
  .then(() => {
    console.log(`Connected to mongoose. Uri: #{mongoUri}`);
  })
  .catch(console.error);

module.exports = mongoose;