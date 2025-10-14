const mongoose = require("mongoose");
const Initialization = require("./initialization");

let cached = global.__mongooseConnection;

if (!cached) {
  cached = global.__mongooseConnection = { conn: null, promise: null, initialized: false };
}

async function MongooseConnection() {
  if (cached.conn) {
    if (!cached.initialized) {
      await Initialization();
      cached.initialized = true;
    }
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    cached.promise = mongoose.connect(process.env.DB_URI, options).then((mongooseInstance) => mongooseInstance);
  }

  cached.conn = await cached.promise;

  if (!cached.initialized) {
    await Initialization();
    cached.initialized = true;
  }

  return cached.conn;
}

module.exports = MongooseConnection;
