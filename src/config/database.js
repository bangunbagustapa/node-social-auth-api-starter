import mongoose from 'mongoose';

import log from '../utils/log';

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  log.success('Mongoose connected');
});

mongoose.connection.on('error', (err) => {
  log.error(`Mongoose connection error. ${err}`);
});
