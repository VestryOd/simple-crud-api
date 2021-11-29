import { validate } from "uuid";

const validateUUID = id => validate(id);

const validatePureUrl = url => url.indexOf('persons') !== -1;

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
  parseId,
  CustomError,
  validateUUID,
  validatePureUrl,
};
