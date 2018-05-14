const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;

var ProviderSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Provider', ProviderSchema)