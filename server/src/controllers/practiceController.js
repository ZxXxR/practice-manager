import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Practice } from '../models/Practice.js';

const prisma = new PrismaClient();

export class PracticeController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.practice.findMany({});
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

            const practice = await prisma.practice.findFirst({ where: { id: parseInt(id) } });

            if (!practice) return res.status(404).send();

            return res.send(new Practice(practice).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}