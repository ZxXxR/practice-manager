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

    static async create(req, res) {
        try {
            const { name } = req.body;

            if (!name) return res.code(400).send();

            const candidate = await prisma.direction.findFirst({ where: { name } });

            if (candidate) return res.code(409).send();

            const newDirection = new Direction({ name }),
                query = await prisma.direction.create({
                    data: newDirection.toJSON()
                });

            return res.send(new Direction(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

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
    
    static async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.code(400).send();

            const direction = await prisma.direction.findFirst({ where: { id: parseInt(id) } });

            if (!direction) return res.status(404).send();

            const dependenceEntry = await prisma.practice.findFirst({ where: { direction: direction.id } });

            if (dependenceEntry) return res.status(409).send();

            const query = await prisma.direction.delete({ where: { id: parseInt(id) } });

            return res.send(new Direction(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}