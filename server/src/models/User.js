import randomString from '../utils/randomString.js';
import bcrypt from 'bcrypt';

export class User {
    constructor({
        id,
        person_id,
        username,
        login,
        password,
        token = randomString({}),
        created_at = new Date(),
        updated_at = new Date()
    }) {
        if (typeof id !== 'number' && typeof id !== 'undefined') throw new Error('Parameter "id" must be "number" type');
        if (typeof person_id !== 'number') throw new Error('Parameter "person_id" must be "number" type');
        if (typeof username !== 'string') throw new Error('Parameter "username" must be "string" type');
        if (typeof login !== 'string') throw new Error('Parameter "login" must be "string" type');
        if (typeof password !== 'string') throw new Error('Parameter "password" must be "string" type');
        if (typeof token !== 'string') throw new Error('Parameter "token" must be "string" type');
        if (!(created_at instanceof Date)) throw new Error('Parameter "created_at" must be "date" type');
        if (!(updated_at instanceof Date)) throw new Error('Parameter "updated_at" must be "date" type');

        this.id = id;
        this.person_id = person_id;
        this.username = username;
        this.login = login;
        this.password = password;
        this.token = token;
        this.created_at = created_at;
        this.updated_at = updated_at;

        if (password) this.password = bcrypt.hashSync(password, 7);
    }

    toJSON() {
        return {
            id: this.id,
            person_id: this.person_id,
            username: this.username,
            login: this.login,
            password: this.password,
            token: this.token,
            created_at: this.created_at,
            updated_at: this.updated_at
        };
    }
}