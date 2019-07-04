const router = require("express").Router();
const jwt = require("jsonwebtoken");

router.get("/generate-password", (req, res) => {
  let password = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    password += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  res.cookie("pw", password);
  res.json({ password });
});

router.post("/login", (req, res) => {
  let { username } = req.body;
  if (username !== "admin") {
    return res.status(400).json("Invalid username or password");
  }
  let token = jwt.sign({ username: "admin" }, process.env.SECRET);
  return res.json({ token });
});

module.exports = router;
