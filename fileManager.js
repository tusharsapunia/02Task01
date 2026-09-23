const fs = require("fs");
const path = require("path");
const fileloc = path.join( __dirname, "data", "expenses.json");

function readData() {
  if (!fs.existsSync(fileloc)) {
    fs.writeFileSync(fileloc, "[]");
  }

  const data = fs.readFileSync(fileloc, "utf-8");
  return JSON.parse(data);
}

function writeData(data) {
  fs.writeFileSync(fileloc, JSON.stringify(data, null, 2));
}

module.exports = {
  readData,
  writeData,
};
