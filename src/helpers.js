import { errors } from "./constants";

class ServerError extends Error{
  constructor() {
    super();
    this.message = errors.serverError;
    this.isServerSide = true;
    this.statusCode = 500;
  }
}

class CustomError extends Error {
  constructor(props) {
    super(props);
    this.message = props.message;
    this.statusCode = props.statusCode;
  }
}

const parseId = (reqUrl) => {
  return reqUrl.slice(1).split('/')[1];
}

export {
  ServerError,
  parseId,
  CustomError,
};
