const mongoose  = require("mongoose");
const Schema    = mongoose.Schema;

var ClientSchema = new Schema({
  name: String,
  email: String,
  phone: String,
  providers: [ { type: Schema.Types.ObjectId, ref: 'Provider' } ]
});

module.exports  = mongoose.model("Client", ClientSchema);