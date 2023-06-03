import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Role } from '../models/Role.js';

const prisma = new PrismaClient();

export class RoleController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.role.findMany({});
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const { name, access_level, is_default } = req.body;

            if (!name) return res.code(400).send();

            const candidate = await prisma.role.findFirst({ where: { name } });

            if (candidate) return res.code(409).send();

            const newRole = new Role({
                    name,
                    access_level: access_level ?? 0,
                    is_default: is_default ?? false
                }),
                query = await prisma.role.create({
                    data: newRole.toJSON()
                });

            return res.send(new Role(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async get(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.code(400).send();

            const role = await prisma.role.findFirst({ where: { id: parseInt(id) } });

            if (!role) return res.status(404).send();

            return res.send(new Role(role).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}