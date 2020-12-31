import ErrorHandler from '../utils/error-handler';

/*
This error handling will catches and processes errors that occur
both synchronously and asynchronously. Learn more here
https://expressjs.com/en/guide/error-handling.html
*/
const errorHandling = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  error.statusCode = err.status || 500;

  /*
  In this if statement block, we check if the message is
  an array. This message come from express-validator
  */
  if (Object.prototype.toString.call(err.message) === '[object Array]') {
    return res.status(error.statusCode).json({ error: { messages: error.message } });
  }

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorHandler(404, message);
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorHandler(400, message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorHandler(400, message);
  }

  return res.status(error.statusCode).json({ error: { message: error.message } });
};

export default errorHandling;
