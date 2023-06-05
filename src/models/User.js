import encrypt from '../helpers/secure.js';
import BaseModel from './BaseModel.js';

class User extends BaseModel {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'email', 'password'],
            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 1 },
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 3 },
            },
        };
    }

    set password(value) {
        this.password_digest = encrypt(value);
    }

    get name() {
        return `${this.lastName} ${this.firstName}`;
    }

    verifyPassword(password) {
        return this.password_digest === encrypt(password);
    }
}

export default User;
