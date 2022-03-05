const mongoose = require("mongoose");
const Initialization = require("./initialization");

const MongooseConnection = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connection Success.");
      Initialization();
    })
    .catch((err) => {
      console.error("Mongo Connection Error", err);
    });
};

module.exports = MongooseConnection;
