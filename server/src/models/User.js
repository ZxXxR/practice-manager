import randomString from '../utils/randomString.js';
import reformatDate from '../utils/reformatDate.js'
import bcrypt from 'bcrypt';

export class User {
    constructor({
        id,
        username,
        login,
        password,
        token = randomString({}),
        created_at = new Date(),
        updated_at = new Date()
    }) {
        this.id = id;
        this.username = username;
        this.login = login;
        this.token = token;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
        
        if (password) this.password = bcrypt.hashSync(password, 7);
    }

    toJSON() {
        return reformatDate({
            id: this.id,
            username: this.username,
            login: this.login,
            token: this.token,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        });
    }
}