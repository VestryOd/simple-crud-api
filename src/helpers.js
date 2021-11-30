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

const validateRules = {
  name: (prop) => {
    return typeof prop === 'string' && prop?.length > 0;
  },
  age: (prop) => {
    return typeof prop === 'number' && prop > 0;
  },
  hobbies: (prop) => {
    if (!Array.isArray(prop)) return false;
    const wrongEntries = prop.filter(el => typeof el !== 'string')
    return wrongEntries?.length <= 0;
  },
};

export {
  parseId,
  CustomError,
  validateUUID,
  validatePureUrl,
  validateRules,
};
