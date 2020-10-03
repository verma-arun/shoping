const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.MY_TEST_PORT || 4000;
var mongoose = require("mongoose");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect("mongodb://localhost/test");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function callback() {
  console.log("Mongodb Connected");
});

require("./app/routes/users.route")(app);

app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
