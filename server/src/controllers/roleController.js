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

    // create

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