const fs = require("fs");

exports.writeFileSync = function(Filename, FileType, DataToWrite) {
  this.createNessesaryDirectories();
  fs.writeFileSync(Filename + "." + FileType, DataToWrite);
};
exports.createNessesaryDirectories = function() {
  if (!fs.existsSync("./out")) {
    fs.mkdirSync("./out");
  }
};
