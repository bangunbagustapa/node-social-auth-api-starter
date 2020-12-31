/*
This file create a custom Error constructor which extends the
JavaScript Error constructor. Instead of throwing Error,
you can throw ErrorHandler with two arguments
*/
class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default ErrorHandler;
