const fs = require("fs");
const router = require("express").Router();
const multer = require("multer");
const passport = require("passport");

const Device = require("../models/Device");
const User = require("../models/User");
const createUploadsDir = require("../utils/create-uploads-dir");
const checkId = require("../middlewares/check-id");
const firebaseStorage = require("../utils/storage");

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
        let bucket = firebaseStorage.bucket();
        device.image = {};
        bucket.upload(image.path, async (err, file, response) => {
          if (err) {
            throw new Error(err);
          }
          await file.makePublic();
          device.image = response.mediaLink;
          fs.unlink(image.path, async err => {
            if (err) {
              throw new Error(err);
            }
            await device.save();
            return res.status(201).json(device);
          });
        });
      }
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
      return res.status(200).send({ message: "device deleted" });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

module.exports = router;
