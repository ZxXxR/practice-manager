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

    // create

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