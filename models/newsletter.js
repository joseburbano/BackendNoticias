const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const newsletterSchema = Schema({
  email: { 
      type: String,
      unique: true,
     },
  active: Boolean,
});
module.exports = mongoose.model("newsletter", newsletterSchema);
