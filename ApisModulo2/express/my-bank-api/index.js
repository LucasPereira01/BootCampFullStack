const express = require('express');
const fs = require('fs').promises;
const app = express();
const accountsRouter = require('./routes/accounts');
const winston = require('winston');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./doc');
global.fileName = 'accounts.json';

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'my-bank-api.log' }),
  ],
  format: combine(label({ label: 'my-bank-api' }), timestamp(), myFormat),
});

app.use(express.json());
app.use('/account', accountsRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, async () => {
  try {
    await fs.readFile(global.fileName, 'utf-8');
    logger.info('Api started');
  } catch (err) {
    const initialJson = {
      nextId: 1,
      accounts: [],
    };
    logger.info('aquivo accounts.json Criado ');
    fs.writeFile(global.fileName, JSON.stringify(initialJson)).catch((err) => {
      logger.error(err);
    });
  }
});
