const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cost: {
    type: String,
    required: true
  },
  expiry: {
    type: Date,
    required: true
  },
  warranty: {
    type: String,
    required: true
  },
  image: {
    filePath: String,
    fileUrl: String
  }
});

module.exports = mongoose.model("devices", deviceSchema);
