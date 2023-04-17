import randomString from '../utils/randomString.js';
import reformatDate from '../utils/reformatDate.js'
import bcrypt from 'bcrypt';

export class User {
    constructor({
        id,
        firstName,
        lastName,
        secondName = '',
        username,
        login,
        password,
        group_id = -1,
        roles,
        token = randomString({}),
        created_at = new Date(),
        updated_at = new Date()
    }) {
        this.id = id;;
        this.firstName = firstName;
        this.lastName = lastName;
        this.secondName = secondName;
        this.username = username;
        this.login = login;
        this.token = token;
        this.roles = roles;
        this.group_id = group_id;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
        
        // TODO: Check roles

        if (password) this.password = bcrypt.hashSync(password, 7);
    }

    toJSON() {
        return reformatDate({
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            secondName: this.secondName,
            username: this.username,
            login: this.login,
            token: this.token,
            roles: this.roles,
            group: this.group_id,
            created_at: this.createdAt,
            updated_at: this.updatedAt
        });
    }
}