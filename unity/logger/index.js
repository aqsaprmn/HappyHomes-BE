const winston = require("winston");

const transports = winston.transports;

const { combine, timestamp, printf } = winston.format;

const logger = winston.createLogger({
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    printf(({ timestamp, level, message }) => {
      return `[${timestamp}] [${level}] ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "app.log" }),
  ],
});

module.exports = logger;
