import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Enterprise } from '../models/Enterprise.js';

const prisma = new PrismaClient();

export class EnterpriseController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.enterprise.findMany({});
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

            const enterprise = await prisma.enterprise.findFirst({ where: { id: parseInt(id) } });

            if (!enterprise) return res.status(404).send();

            return res.send(new Enterprise(enterprise).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}