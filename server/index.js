const path = require("path");
const express = require("express");

const server = express();

server.use("*", (req, res) => {
  res.sendfile(
    path.resolve(__dirname, "..", "dist", "mean-task", "index.html")
  );
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running on port ${port}`));
