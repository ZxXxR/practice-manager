import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { User } from '../models/User.js';
import { Person } from '../models/Person.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';

const prisma = new PrismaClient();

export class AuthController {
    static async login(req, res) {
        try {
            const { login, password } = req.body,
                data = await prisma.user.findFirst({ where: { login } });

            if (!data || !bcrypt.compareSync(password, data.password)) return res.code(404).send();

            const token = await res.jwtSign({
                login: data.login,
                iss: process.env.SERVER_HOSTNAME,
                iat: Date.now()
            });

            return res.setCookie('session', token, {
                domain: process.env.SERVER_HOSTNAME,
            }).send();
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async register(req, res) {
        try {
            const { 
                username, login, password,
                first_name, last_name, second_name, email, group_id
            } = req.body;

            if (
                !username || !login || !password ||
                !first_name || !last_name || !second_name || !email
            ) return res.code(400).send();

            const candidate = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: { equals: username } },
                        { login: { equals: login }}
                    ]
                }
            });

            if (candidate) return res.code(409).send();

            const newPerson = new Person({
                    first_name,
                    last_name,
                    second_name: second_name ?? '',
                    photo: '',
                    email: email ?? '',
                    position: 'student',
                    group_id: group_id ?? undefined,
                    comment: ''
                }),
                newUser = new User({
                    person_id: 0,
                    username,
                    login,
                    password
                }),
                query = await prisma.user.create({
                    data: Object.assign(
                        objectRemoveKeys(newUser.toJSON(), 'person_id'),
                        {
                            person: {
                                create: Object.assign(
                                    objectRemoveKeys(newPerson.toJSON(), 'group_id'),
                                    { group: newPerson.group }
                                )
                            }
                        }
                    ),
                    include: { 
                        person: { include: { group: true } },
                        roles: true
                    }
                }),
                token = await res.jwtSign({
                    login: query.login,
                    iss: process.env.SERVER_HOSTNAME,
                    iat: Date.now()
                });

            return res.setCookie('session', token, {
                domain: process.env.SERVER_HOSTNAME,
            }).send();
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async logout(req, res) {
        try {
            return res.clearCookie('session', {
                domain: process.env.SERVER_HOSTNAME,
            }).send();
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}