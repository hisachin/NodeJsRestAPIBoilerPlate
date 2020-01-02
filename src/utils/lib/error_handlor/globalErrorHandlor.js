import {
  CustomError
} from './customError';

const notFoundErrorHandler = (req, res, next) => {
  if (!req.resourcePath) {
    throw new CustomError('UrlNotFound',`The path ${req.path} is not found`);
  }
  next();
}

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);

  const error = {
    status : false,
    code : err.code || 500,
    error : {
      type : err.name || "ServerError",
      details : {
        message : err.message
      }
    }
  }
  
  return res.status(error.code).json(error);
}

module.exports = {
    globalErrorHandler,
    notFoundErrorHandler
};