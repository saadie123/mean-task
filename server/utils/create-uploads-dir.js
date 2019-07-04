const fs = require("fs");
const path = require("path");
module.exports = () => {
  let uploadsDir = path.resolve(__dirname, "..", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }
  return uploadsDir;
};
