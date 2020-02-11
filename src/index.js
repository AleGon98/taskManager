const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
mongoose
  .connect("mongodb://localhost/mevn-databse")
  .then(db => console.log("DB is connected"))
  .catch(err => console.error(err));

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/tasks", require(".\\routes\\tasks"));

//Static files
app.use(express.static(__dirname + "\\public"));

//app.use(express.static())

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
