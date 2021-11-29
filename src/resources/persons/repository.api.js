import { v4 as uuidv4 } from 'uuid';
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
            return new CustomError({
                message: `Person with id: ${id} not found`,
                statusCode: 404,
            });
        }
        return this._DB.get(id);
    }

    getAll() {
        return Array.from(this._DB.values());
    }

    add(data) {
        const checked = Person.validateFields(data);
        if (!checked.validated) {
            return new CustomError({
                message: `Incorrect fields: ${checked.wrongFields.join(', ')}`,
                statusCode: 400,
            });
        }
        const person = new Person(data);
        person.id = uuidv4();
        this._DB.set(person.id, person);
        return person;
    }

    update(data) {
        const { id } = data;
        if (!id || !this._checkExistence(id)) {
            return new CustomError({
                message: `Person with id: ${id} not found`,
                statusCode: 404,
            });
        }
        const upd = {
            ...this._DB.get(id),
            ...data,
        };
        this._DB.set(id, upd);
        return upd;
    }

    remove(id) {
        if (!id || !this._checkExistence(id)) {
            return new CustomError({
                message: `Person with id: ${id} not found`,
                statusCode: 404,
            });
        }
        this._DB.delete(id);
        return true;
    }
}
