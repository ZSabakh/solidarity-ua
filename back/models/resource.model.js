const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");
const Schema = mongoose.Schema;

const resourceSchema = new Schema({
  name: { type: String, intl: true },
  description: { type: String, intl: true, required: true },
  link: { type: String, required: true },
  image: { type: String },
});

resourceSchema.plugin(mongooseIntl, { languages: ["en", "ua", "ka"], defaultLanguage: "en" });

const HelpType = mongoose.model("resource", resourceSchema);
module.exports = HelpType;
