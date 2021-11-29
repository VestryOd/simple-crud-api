// import { v4 as uuidv4 } from 'uuid';
import Person from "./model.js";
import { CustomError } from "../../helpers.js";

export default class RepositoryApi {
    constructor() {
        this._DB = null;
    }

    _checkExistence(id) {
        return this._DB.has(id);
    }

    connectDB(instance) {
        this._DB = instance;
    }

    getOne(id) {
        if (!id || !this._checkExistence(id)) {
            console.log('--not exist', id);
            throw new CustomError({
                message: `Person with id: ${id} not found`,
                statusCode: 404,
            });
        }
        console.log('--return something');
        return this._DB.get(id);
    }

    getAll() {
        return Array.from(this._DB.values());
    }

    add(req, _) {
        return new Promise((resolve, reject) => {
            req.on('data', chunk => {
                const data = JSON.parse(chunk);
                const checked = Person.validateFields(data);
                if (!checked.validated) {
                    reject({
                        message: `Incorrect fields: ${checked.wrongFields.join(', ')}`,
                        statusCode: 400,
                    });
                } else {
                    const person = new Person(data);
                    this._DB.set(person.id, person);
                    console.log('--add', person);
                    resolve(person);
                }
            })
        });
    }

    update(req, _) {
        return new Promise((resolve, reject) => {
            req.on('data', chunk => {
                const data = JSON.parse(chunk);
                const { id } = data;
                if(!id || !this._checkExistence(id)) {
                    reject({
                        message: `Person with id: ${id} not found`,
                        statusCode: 404,
                    });
                } else {
                    const upd = {
                        ...this._DB.get(id),
                        ...data,
                    };
                    this._DB.set(id, upd);
                    resolve(upd);
                }
            })
        });
    }

    remove(id) {
        if (!id || !this._checkExistence(id)) {
            throw new CustomError({
                message: `Person with id: ${id} not found`,
                statusCode: 404,
            });
        }
        this._DB.delete(id);
        return `Person with id: ${id} has removed`;
    }
}
