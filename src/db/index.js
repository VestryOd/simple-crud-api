import fs from 'fs';
import { ServerError } from '../helpers';

const checkForExistence = (path) => {
  return new Promise((res, _) => {
    path ?
      fs.access(path, fs.constants.F_OK, (err) => {
        if (err) {
          throw new ServerError();
        } else res();
      })
      :res();
  });
}

export {
  checkForExistence,
};
