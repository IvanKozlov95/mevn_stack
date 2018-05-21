const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

var ProviderSchema = new Schema({
  name: { type: String, unique : true, required : true },
});
ProviderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Provider', ProviderSchema)