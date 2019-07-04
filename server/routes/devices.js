const fs = require("fs");
const router = require("express").Router();
const multer = require("multer");
const passport = require("passport");

const Device = require("../models/Device");
const User = require("../models/User");
const createUploadsDir = require("../utils/create-uploads-dir");
const checkId = require("../middlewares/check-id");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const devices = await Device.find();
      res.json(devices);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dir = createUploadsDir();
    cb(null, dir);
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  async (req, res) => {
    try {
      let { name, cost, warranty, expiry } = req.body;
      let device = await Device.create({
        name,
        cost,
        warranty,
        expiry
      });
      let image = req.file;
      if (image) {
        device.image = {};
        device.image.filePath = image.path;
        device.image.fileUrl = `/api/devices/${device._id}/image`;
        await device.save();
      }
      res.status(201).json(device);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

router.get("/:id/image", checkId, async (req, res) => {
  try {
    const id = req.params.id;
    let device = await Item.findById(id);
    if (!device) {
      return res.status(404).json("Device not found");
    }
    if (device.image) {
      return res.sendFile(device.image.filePath);
    } else {
      res.status(404).send({ error: "Item image not found" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  checkId,
  async (req, res) => {
    try {
      const id = req.params.id;
      let device = await Device.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      if (!device) {
        return res.status(404).json("Device not found");
      }
      res.json(device);
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
      let device = await Device.findByIdAndRemove(id);
      if (!device) {
        return res.status(404).json("Device not found");
      }
      await User.findOneAndRemove({ device: device._id });
      if (device.image !== null || device.image !== undefined) {
        fs.unlink(device.image.filePath, err => {
          if (err) {
            throw new Error(err);
          }
          return res.status(200).send({ message: "device deleted" });
        });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;