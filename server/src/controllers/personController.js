import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Person } from '../models/Person.js';

const prisma = new PrismaClient();

export class PersonController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.person.findMany({});
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

            const person = await prisma.person.findFirst({ where: { id: parseInt(id) } });

            if (!person) return res.status(404).send();

            return res.send(new Person(person).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}