import RepositoryApi from "./repository.api";
const api = new RepositoryApi();
import { parseId } from "../../helpers";
import db from "./db";

api.connectDB(db);

const getOne = (req, res) => {
  try {
    const id = parseId(req.url);
    return api.getOne(id);
  } catch (e) {
    const { message, statusCode } = e;
    console.error(`Service-layer, operation: getOne, reason: ${message || e}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const getAll = (req, res) => {
  try {
    return api.getAll();
  } catch(e) {
    const { message, statusCode } = e;
    console.error(`Service-layer, operation: getAll, reason: ${message || e}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const create = (req, res) => {
  try {
    let newPerson = '';
    req.on('data', (data) => newPerson += data);
    req.on('end', () => {
      const data = JSON.parse(newPerson);
      return api.add(data);
    });
  } catch(e) {
    const { message, statusCode } = e;
    console.error(`Service-layer, operation: create, reason: ${message || e}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const update = (req, res) => {
  try {
    let updatedPerson = '';
    req.on('data', (data) => updatedPerson += data);
    req.on('end', () => {
      const data = JSON.parse(updatedPerson);
      return api.update(data);
    })
  } catch (e) {
    const { message, statusCode } = e;
    console.error(`Service-layer, operation: update, reason: ${message || e}`);
    res.writeHead(statusCode || 500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: message || "Internal server error" }));
  }
}

const remove = (req, res) => {
  try {
    const id = parseId(req.url);
    return api.remove(id);
  } catch (e) {
    const { message, statusCode } = e;
    console.error(`Service-layer, operation: remove, reason: ${message || e}`);
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
