const fs = require("fs");

const logToFile = (log) => {
  const logFilePath = "../logs/log.txt";
  const currentTime = new Date().toISOString();

  const logEntry = `${currentTime}: ${log}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Error writing to log file:", err);
    }
  });
};

module.exports = logToFile;
