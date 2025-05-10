const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "logs.txt");

const storeLog = (heading, content) => {
  const log = `${heading.toUpperCase()} : ${content} -- ${new Date().toLocaleString()}\n`;
  try {
    fs.appendFileSync(filePath, log);
    console.log(log);
  } catch (err) {
    console.error("Failed to write log:", err.message);
  }
};

module.exports = storeLog;
