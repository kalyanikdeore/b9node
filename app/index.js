require("dotenv").config();
const express = require("express");
const morgan = require("morgan"); // logger
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const sequelize = require("./utils/db");

const User = require("./models/userModel");

const models = {
  User,
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

const app = express();

app.use(morgan("dev"));
app.use(express.json()); // body parser
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/dev/:id", (req, res) => {
  console.log(req.body);
  console.log(req.params);
  console.log(req.query);
  const { id } = req.params;
  console.log(id);
  res.status(200).json("Hellosdfdsfdfsfsafs");
});

sequelize
  .authenticate()
  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Models have been synchronized with the database.");

    const PORT = 8080;

    app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
