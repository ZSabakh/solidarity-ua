const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");
const Schema = mongoose.Schema;

const helpTypeSchema = new Schema({
  name: { type: String, intl: true, required: true, unique: true },
});

helpTypeSchema.plugin(mongooseIntl, { languages: ["en", "ua", "ka"], defaultLanguage: "en" });

const HelpType = mongoose.model("help_type", helpTypeSchema);
module.exports = HelpType;
