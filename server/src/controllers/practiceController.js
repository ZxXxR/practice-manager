import { PrismaClient } from '@prisma/client';
import { Practice } from '../models/Practice.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';
import reformatDate from '../utils/reformatDate.js';

const prisma = new PrismaClient();

export class PracticeController {
    static async getAll(req, res) {
        try {
            const practices = await prisma.practice.findMany({ include: { direction_id: true, practiceAssignments: true } });

            return practices.map(practice => {
                return reformatDate(
                    Object.assign(
                        new Practice(practice).toJSON(), 
                        {
                            direction: practice.direction_id,
                            assignments: practice.practiceAssignments
                        }
                    )
                );
            });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const { name, direction, start_date, end_date, type } = req.body;

            if (
                !direction || !type || !(['education', 'production'].includes(type))
            ) return res.code(400).send();

            const directionEntry = await prisma.direction.findFirst({ where: { id: parseInt(direction) } });

            if (!directionEntry)  return res.code(400).send();

            const newPractice = new Practice({
                    name: name ?? '',
                    direction: parseInt(direction),
                    start_date: start_date ? new Date(start_date) : new Date(),
                    end_date: end_date ? new Date(end_date) : new Date(),
                    type
                }),
                query = await prisma.practice.create({
                    data: Object.assign(
                        objectRemoveKeys(newPractice.toJSON(), 'direction'), 
                        {
                            direction_id: {
                                connect: { id: newPractice.direction }
                            }
                        }
                    ),
                    include: { direction_id: true, practiceAssignments: true }
                });

            return res.send(reformatDate(
                Object.assign(
                    new Practice(query).toJSON(),
                    {
                        direction: query.direction_id,
                        assignments: query.practiceAssignments
                    }
                )
            ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async get(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.code(400).send();

            const practice = await prisma.practice.findFirst({
                where: { id: parseInt(id) },
                include: { direction_id: true, practiceAssignments: true }
            });
            console.log(practice);
            
            if (!practice) return res.status(404).send();

            return res.send(reformatDate(
                Object.assign(
                    new Practice(practice).toJSON(),
                    {
                        direction: practice.direction_id,
                        assignments: practice.practiceAssignments
                    }
                )
            ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params,
                { name, direction, start_date, end_date, type } = req.body;

            const practice = await prisma.practice.findFirst({ where: { id: parseInt(id) } });
            
            if (!practice) return res.code(404).send();
            if (type && !(['education', 'production'].includes(type))) return res.code(400).send();
            
            if (direction) {
                const directionEntry = await prisma.direction.findFirst({ where: { id: parseInt(direction) } });
                if (!directionEntry) return res.code(400).send();
            }

            const updatedPractice = new Practice({
                    id: practice.id,
                    name: name ?? practice.name,
                    direction: direction ?? practice.direction,
                    start_date: start_date ? new Date(start_date) : practice.start_date,
                    end_date: end_date ? new Date(end_date) : practice.end_date,
                    type: type ?? practice.type
                }),
                query = await prisma.practice.update({
                    where: { id: practice.id },
                    data: updatedPractice.toJSON(),
                    include: { direction_id: true, practiceAssignments: true }
                });

                return res.send(reformatDate(
                    Object.assign(
                        new Practice(query).toJSON(),
                        {
                            direction: query.direction_id,
                            assignments: query.practiceAssignments
                        }
                    )
                ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
    
    static async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.code(400).send();

            const practice = await prisma.practice.findFirst({
                where: { id: parseInt(id) },
                include: { direction_id: true, practiceAssignments: true }
            });
            
            if (!practice) return res.status(404).send();

            const dependenceReportsEntry = await prisma.report.findFirst({ where: { practice_id: practice.id } }),
                dependenceAssignmentsEntry = await prisma.practiceAssignments.findFirst({ where: { practice_id: practice.id } });

            if (dependenceReportsEntry || dependenceAssignmentsEntry) return res.status(409).send();

            const query = await prisma.practice.delete({
                where: { id: parseInt(id) },
                include: { direction_id: true, practiceAssignments: true }
            });

            return res.send(reformatDate(
                Object.assign(
                    new Practice(query).toJSON(),
                    {
                        direction: query.direction_id,
                        assignments: query.practiceAssignments
                    }
                )
            ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}