//server.js
const express = require("express");
const favicon = require("express-favicon");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
// Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
const environment = process.env.NODE_ENV; // development
if (environment !== "production") {
  app.use(logger("dev"));
  // and this
  app.use("/", logger("dev"));
}
const routes = require("./routes/index.js");
app.use("/api/v1", routes(router));
app.use(favicon(__dirname + "/build/favicon.ico"));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/.*/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(port, () => console.log(`server run on port ${port}`));
