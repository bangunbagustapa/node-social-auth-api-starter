import express from 'express';
import cors from 'cors';

import './config/database';

import auth from './routes/auth';
import users from './routes/users';

import errorHandling from './middlewares/error';

import log from './utils/log';

const app = express();

app.use(express.json({ extended: false }));
app.use(cors());

app.use('/auth', auth);
app.use('/users', users);

/*
This error handling will catches and processes errors that occur
both synchronously and asynchronously. Learn more here
https://expressjs.com/en/guide/error-handling.html
*/
app.use(errorHandling);

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), () => {
  log.success(`Server running on port ${app.get('port')}`);
});

process.on('unhandledRejection', (reason) => {
  log.error(`Unhandled rejection. ${reason}`);
});

process.on('uncaughtException', (err) => {
  log.error(`Uncaught exception. ${err.message}`);
  process.exit(1);
});
