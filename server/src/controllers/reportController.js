import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Report } from '../models/Report.js';

const prisma = new PrismaClient();

export class ReportController extends Controller {
    static async getAll(req, res) {
        try {
            return await prisma.report.findMany({});
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

            const report = await prisma.report.findFirst({ where: { id: parseInt(id) } });

            if (!report) return res.status(404).send();

            return res.send(new Report(report).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}