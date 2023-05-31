import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { PracticeAssignment } from '../models/PracticeAssignment.js';

const prisma = new PrismaClient();

export class AssignmentController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.practiceAssignments.findMany({});
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

            const assignment = await prisma.practiceAssignments.findFirst({ where: { id: parseInt(id) } });

            if (!assignment) return res.status(404).send();

            return res.send(new PracticeAssignment(assignment).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}