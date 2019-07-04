const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  let { username } = req.body;
  if (username !== "admin") {
    return res.status(400).json("Invalid username or password");
  }
  let token = jwt.sign({ username: "admin" }, process.env.SECRET);
  return res.json({ token });
});

module.exports = router;
