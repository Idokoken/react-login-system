const express = require("express");
const chalk = require("chalk");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoute = require("./route/userRoute");
const User = require("./model/userModel");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

//Middleware setup
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
  })
);

//Database setup
mongoose.connect(process.env.MONGO_URI2, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", () => console.log(`error connecting to login-system database`));
db.once("open", () =>
  console.log(
    `successfully connected to ${chalk.cyan("login-system database")}`
  )
);

// Routes setup
app.use("/user", userRoute);
app.get("/profile", (req, res) => {
  // res.json({ msg: "Welcome to Iwosan" });
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userInfo) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userInfo.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});
app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.listen(port, () => console.log(`Listening on port ${chalk.cyan(8000)}`));
