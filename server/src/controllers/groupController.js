import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Group } from '../models/Group.js';

const prisma = new PrismaClient();

export class GroupController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.group.findMany({});
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const { name } = req.body;

            if (!name) return res.code(400).send();

            const candidate = await prisma.group.findFirst({ where: { name } });

            if (candidate) return res.code(409).send();

            const newGroup = new Group({ name }),
                query = await prisma.group.create({
                    data: newGroup.toJSON()
                });

            return res.send(new Group(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async get(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.code(400).send();

            const group = await prisma.group.findFirst({ where: { id: parseInt(id) } });

            if (!group) return res.status(404).send();

            return res.send(new Group(group).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}