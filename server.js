const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const config = require("./config/config");
const upload = require("express-fileupload");

const app = express();

 


app.use(upload());
app.use(bodyParser.urlencoded({ limit: '100mb' }));


app.use(bodyParser.json({limit: '100mb'}));
app.use(cors());
app.use(morgan("dev"));

var appRouter = require("./app/routes/app.routes");

appRouter.initialize(app);
/* Request Middleware */
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Headers", "token");
  res.header("Access-Control-Max-Age", "600");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.set("view engine", "jade");

app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;


mongoose
  .connect(config.dbUrl)
  .then(() => {
    console.log("Successfully connected to the database:", config.dbUrl);
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
// listen for requests
app.listen(config.serverPort, () => {
  console.log("Server is listening on port ", config.serverPort);
});



module.exports = app;
