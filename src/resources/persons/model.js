import { v4 as uuidv4 } from 'uuid';
import { validateRules } from "../../helpers.js";

class Person {
    constructor(props) {
        this.id = uuidv4();
        this.name = props.name;
        this.age = props.age;
        this.hobbies = props.hobbies;
    }

    static fields = ['name', 'age', 'hobbies']

    static validateFields(obj) {
        const result = {
            validated: true,
            wrongFields: [],
        };
        this.fields.forEach(prop => {
            if (!prop in obj) {
                result.validated = false;
                result.wrongFields.push(prop);
            } else {
                if (prop && !validateRules[prop](obj[prop])) {
                    result.validated = false;
                    result.wrongFields.push(prop);
                }
            }
        })
        return result;
    }
}

export default Person;