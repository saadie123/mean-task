const router = require("express").Router();
const passport = require("passport");
const User = require("../models/User");
const checkId = require("../middlewares/check-id");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let { firstname, lastname, device } = req.body;
      let user = await User.create({
        firstname,
        lastname,
        device
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkId,
  async (req, res) => {
    try {
      const id = req.params.id;
      let user = await User.findByIdAndUpdate(id, { $set: { device: null } });
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkId,
  async (req, res) => {
    try {
      const id = req.params.id;
      let user = await User.findByIdAndRemove(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
