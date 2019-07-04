const validator = require("validator");
module.exports = (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    return res.status(400).send("Invalid ID");
  }
  next();
};
