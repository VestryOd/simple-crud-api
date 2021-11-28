import { errors } from "./constants";

class ServerError extends Error{
  constructor() {
    super();
    this.message = errors.serverError;
    this.isServerSide = true;
    this.statusCode = 500;
  }
}

const parseId = (reqUrl) => {
  return reqUrl.slice(1).split('/')[1];
}

export {
  ServerError,
  parseId,
};
