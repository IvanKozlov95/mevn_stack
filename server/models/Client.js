const mongoose        = require("mongoose");
const Schema          = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ClientSchema = new Schema({
  name: { type: String, unique : true, required : true },
  email: { type: String, unique : true, required : true },
  phone: { type: String, unique : true, required : true },
  providers: [ { type: Schema.Types.ObjectId, ref: 'Provider' } ]
});
ClientSchema.plugin(uniqueValidator);

module.exports  = mongoose.model("Client", ClientSchema);