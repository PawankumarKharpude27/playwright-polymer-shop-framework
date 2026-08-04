import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logDir = path.resolve(__dirname, '..', 'logs');
fs.mkdirSync(logDir, { recursive: true });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`
    )
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'automation.log') }),
    new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export default logger;
