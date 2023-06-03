import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { User } from '../models/User.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';
import reformatDate from '../utils/reformatDate.js';

const prisma = new PrismaClient();

export class UserController extends Controller {
    static async getAll(req, res) {
        try {
            const users = await prisma.user.findMany({
                include: { 
                    person: {
                        include: { group: true } 
                    },
                    roles: true
                }
            });

            return users.map(user => {
                return reformatDate(Object.assign(
                    objectRemoveKeys(new User(user).toJSON(), ['person_id', 'password']),
                    { 
                        person: objectRemoveKeys(user.person, 'group_id'),
                        roles: user.roles
                    }
                ));
            });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const {
                person_id,
                username,
                login,
                password,
                token,
                roles
            } = req.body;

            if (!person_id || !username || !login || !password) return res.code(400).send();

            const candidate = await prisma.user.findFirst({ where: { 
                OR: [
                    { person_id: { equals: person_id }},
                    { username: { equals: username }},
                    { login: { equals: login }}
                ]
            }});
            
            if (candidate) return res.code(409).send();

            const personEntry = await prisma.person.findFirst({ where: { id: parseInt(person_id) } }),
                rolesEntry = await prisma.role.findMany({ where: { id: { in: roles } } });

            if (!personEntry || rolesEntry?.length != roles?.length)  return res.code(400).send();

            const newUser = new User({
                    person_id,
                    username,
                    login,
                    password,
                    token
                }),
                query = await prisma.user.create({
                    data: Object.assign(
                        objectRemoveKeys(newUser.toJSON(), 'person_id'), 
                        {
                            person: {
                                connect: { id: newUser.person_id }
                            },
                            roles: {
                                connect: roles ?
                                    roles.map(role => { return { id: role } }) : 
                                    await prisma.findMany({ 
                                        select: { id: true },
                                        where: { is_default: true }
                                    })
                            }
                        }
                    ),
                    include: { 
                        person: { include: { group: true } },
                        roles: true
                    }
                });

            return res.send(reformatDate(
                Object.assign(
                    objectRemoveKeys(new User(query).toJSON(), ['person_id', 'password']),
                    { 
                        person: objectRemoveKeys(query.person, 'group_id'),
                        roles: query.roles
                    }
                )
            ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async get(req, res) {
        try {
            const { login } = req.params;

            if (!login) return res.code(400).send();

            const user = await prisma.user.findFirst({
                where: { login },
                include: { 
                    person: {
                        include: { group: true }
                    },
                    roles: true 
                }
            });

            if (!user) return res.status(404).send();

            return res.send(reformatDate(Object.assign(
                objectRemoveKeys(new User(user).toJSON(), ['person_id', 'password']),
                { 
                    person: objectRemoveKeys(user.person, 'group_id'),
                    roles: user.roles
                }
            )));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}