const express = require("express");
const bodyParser = require("body-parser");
const MongooseConnection = require("./utility/mongoose.connection");
const cors = require("cors");

require("dotenv").config();

MongooseConnection();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/post", require("./routes/post.routes"));

app.listen(process.env.PORT, () => {
  console.log("Server started listening on PORT : " + process.env.PORT);
});
