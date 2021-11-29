class Person {
    constructor(props) {
        this.name = props.name;
        this.age = props.age;
        this.hobbies = props.hobbies;
    }

    static fields = {
        name: {
            type: 'string', isRequired: true
        },
        age: {
            type: 'number', isRequired: true,
        },
        hobbies: {
            type: 'array', isRequired: true,
        }
    }

    static validateFields(obj) {
        const result = {
            validated: true,
            wrongFields: [],
        };
        Object.keys(this.fields).forEach(prop => {
            if (!prop in obj) {
                result.validated = false;
                result.wrongFields.push(prop);
            } else {
                if (
                    this.fields[prop].type === 'array'
                    && !Array.isArray(obj[prop])
                    || this.fields[prop].type !== typeof prop
                ) {
                    result.validated = false;
                    result.wrongFields.push(prop);
                }
            }
        })
        return result;
    }
}

export default Person;