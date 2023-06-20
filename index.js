const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./app/routes/authRoutes");
const userRoutes = require("./app/routes/userRoutes");
const feedRoutes = require("./app/routes/feedRoutes");
const authMiddleware = require("./app/middlewares/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use("/api", authRoutes);
app.use("/api", authMiddleware.verifyToken, userRoutes);
app.use("/api", authMiddleware.verifyToken, feedRoutes);

// function to create log files
const createNewLogFile = () => {
  setInterval(() => {
    const currentTime = moment().toISOString();
    const logFilePath = `../logs/log_${moment().format("YYYYMMDD_HHmmss")}.txt`;
    const log = `${currentTime}: New log file created.\n`;

    fs.writeFile(logFilePath, log, (err) => {
      if (err) {
        console.error("Error creating new log file:", err);
      }
    });
  }, 5 * 60 * 1000); // 5 minutes in milliseconds
};

// Call the function to start creating new log files
createNewLogFile();

// function to delete log files
const deleteOldLogFiles = () => {
  setInterval(() => {
    const logDirectory = "../logs/";

    fs.readdir(logDirectory, (err, files) => {
      if (err) {
        console.error("Error reading log directory:", err);
      } else {
        const currentTime = moment();
        files.forEach((file) => {
          const filePath = logDirectory + file;
          const fileCreationTime = moment(
            file.substring(4, 19),
            "YYYYMMDD_HHmmss"
          );
          const diffInMinutes = currentTime.diff(fileCreationTime, "minutes");

          if (diffInMinutes > 30) {
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error("Error deleting log file:", err);
              } else {
                console.log(`Log file ${file} deleted`);
              }
            });
          }
        });
      }
    });
  }, 10 * 60 * 1000); // 10 minutes in milliseconds
};

// Call the function to start deleting old log files
deleteOldLogFiles();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
