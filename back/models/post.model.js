const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    author: { type: Schema.Types.ObjectId, ref: "user", required: [true, "Invalid user"] },
    type: { type: Schema.Types.ObjectId, ref: "help_type", required: [true, "Invalid help type"] },
    title: { type: String, intl: true, required: true },
    description: { type: String, intl: true, required: true },
    city: { type: Schema.Types.ObjectId, ref: "city", required: [true, "Invalid city"] },
    contact: {
      phone: { value: String, public: { type: Boolean, default: true } },
      email: { value: String, public: { type: Boolean, default: true } },
      telegram: { value: String, public: { type: Boolean, default: true } },
      whatsapp: { value: String, public: { type: Boolean, default: true } },
      viber: { value: String, public: { type: Boolean, default: true } },
      social: { value: String, public: { type: Boolean, default: true } },
    },
    location: { description: String, place_id: String, lat: Number, lng: Number },
    accomodation: {
      rooms_amount: Number,
      beds_amount: Number,
    },
    transportation: {
      capacity: Number,
      radius: String,
    },
    other: {},
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

postSchema.plugin(mongooseIntl, { languages: ["en", "ua", "ka"], defaultLanguage: "en" });

const Post = mongoose.model("post", postSchema);
module.exports = Post;
