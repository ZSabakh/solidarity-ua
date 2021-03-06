const express = require("express");
const MongooseConnection = require("./utility/mongoose.connection");
const cors = require("cors");
const helmet = require("helmet");

require("dotenv").config();

MongooseConnection();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/post", require("./routes/post.routes"));
app.use("/api/", require("./routes/resource.routes"));

app.listen(process.env.PORT, () => {
  console.log("Server started listening on PORT : " + process.env.PORT);
});
