const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");

const passportConfig = require("./config/passport-config");

const authRoutes = require("./routes/auth");
const devicesRoutes = require("./routes/devices");
const usersRoutes = require("./routes/users");

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () =>
  console.log("Connected to db")
);
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(passport.initialize());
server.use(express.static(path.resolve(__dirname, "..", "dist", "mean-task")));

passportConfig(passport);

server.use("/api/auth", authRoutes);
server.use("/api/devices", devicesRoutes);
server.use("/api/users", usersRoutes);

server.use("*", (req, res) => {
  res.sendFile(
    path.resolve(__dirname, "..", "dist", "mean-task", "index.html")
  );
});

const port = process.env.PORT;
server.listen(port, () => console.log(`Server running on port ${port}`));
