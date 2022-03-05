const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  name: { type: String, intl: true, required: true, unique: true },
});

citySchema.plugin(mongooseIntl, { languages: ["en", "ua", "ka"], defaultLanguage: "en" });

const City = mongoose.model("city", citySchema);
module.exports = City;
