import RepositoryApi from "./repository.api.js";
const api = new RepositoryApi();
import db from "./db.js";

api.connectDB(db);

const getOne = (req, res, id) => {
  try {
    return api.getOne(id);
  } catch (e) {
    const { message, statusCode } = e;
    console.error(`Response: getOne failed, reason: ${message || e}, code: ${statusCode}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const getAll = (req, res) => {
  try {
    return api.getAll();
  } catch(e) {
    const { message, statusCode } = e;
    console.error(`Response: getAll failed, reason: ${message || e}, code: ${statusCode}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const create = async (req, res) => {
  try {
    return await api.add(req, res);
  } catch(e) {
    const { message, statusCode } = e;
    console.error(`Response: create failed, reason: ${message || e}, code: ${statusCode}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const update = async (req, res) => {
  try {
    return await api.update(req, res);
  } catch (e) {
    const { message, statusCode } = e;
    console.error(`Response: update failed, reason: ${message || e}, code: ${statusCode}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const remove = (req, res, id) => {
  try {
    return api.remove(id);
  } catch (e) {
    const { message, statusCode } = e;
    console.error(`Response: remove failed, reason: ${message || e}, code: ${statusCode}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

export {
  getOne,
  getAll,
  create,
  update,
  remove,
};
