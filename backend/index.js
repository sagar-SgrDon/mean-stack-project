const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const articleroutes = require("./routes/article");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS,GET,POST,PUT,PATCH,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Origin, X-Requested-With,  Accept,Authorization ",
    "allowedHeaders,socket.io"
  );
  next();
});

app.use("/users", userRoutes);
app.use("/articles", articleroutes);

mongoose
  .connect(
    "mongodb+srv://sagararora:CLd6sksx707ikpmc@mean-project.arphxwe.mongodb.net/mean?retryWrites=true&w=majority"
  )
  .then((res) => console.log("Mongo DB connected"));

app.listen(8000);
