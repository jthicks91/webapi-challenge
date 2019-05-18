const server = require("./server.js");
const express = require("express");

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`\n* Server is running on port ${PORT} *\n`);
});
