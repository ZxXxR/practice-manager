import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Direction } from '../models/Direction.js';

const prisma = new PrismaClient();

export class DirectionController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.direction.findMany({});
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

            const direction = await prisma.direction.findFirst({ where: { id: parseInt(id) } });

            if (!direction) return res.status(404).send();

            return res.send(new Direction(direction).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}