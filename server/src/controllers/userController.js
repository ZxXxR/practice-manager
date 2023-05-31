import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { User } from '../models/User.js';

const prisma = new PrismaClient();

export class UserController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.user.findMany({});
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

            const user = await prisma.user.findFirst({ where: { id: parseInt(id) } });

            if (!user) return res.status(404).send();

            return res.send(new User(user).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}