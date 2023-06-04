import { PrismaClient } from '@prisma/client';
import { Report } from '../models/Report.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';
import reformatDate from '../utils/reformatDate.js';

const prisma = new PrismaClient();

export class ReportController {
    static async getAll(req, res) {
        try {
            const reports = await prisma.report.findMany({
                include: { 
                    practice: {
                        include: { direction_id: true } 
                    },
                    mentor: {
                        include: { group: true } 
                    },
                    student: {
                        include: { group: true } 
                    }
                }
            });

            return reports.map(report => {
                return reformatDate(Object.assign(
                    objectRemoveKeys(new Report(report).toJSON(), ['practice_id', 'mentor_id', 'student_id']),
                    { 
                        practice: objectRemoveKeys(
                            Object.assign(report.practice, { direction: report.practice.direction_id }),
                            'direction_id'
                        ),
                        mentor: report.mentor,
                        student: report.student
                    }
                ));
            });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const {
                practice_id,
                student_id,
                date,
                estimation,
                comment
            } = req.body,
                mentor_id = 1;//req.user.id;

            if (
                !practice_id || !student_id || !estimation ||
                !(['two', 'three', 'four', 'five', 'absent'].includes(estimation))
            ) return res.code(400).send();

            const candidate = await prisma.report.findFirst({ where: { 
                AND: [
                    { practice_id: { equals: practice_id }},
                    { mentor_id: { equals: mentor_id }},
                    { student_id: { equals: student_id }}
                ]
            }});

            if (candidate) return res.code(409).send();

            const practiceEntry = await prisma.practice.findFirst({ where: { id: parseInt(practice_id) } }),
                studentEntry = await prisma.person.findMany({ where: { id: parseInt(student_id) } });

            if (!practiceEntry || !studentEntry)  return res.code(400).send();

            const newReport = new Report({
                    practice_id,
                    mentor_id,
                    student_id,
                    date: date ?? new Date(),
                    estimation,
                    comment: comment ?? ''
                }),
                query = await prisma.report.create({
                    data: Object.assign(
                        objectRemoveKeys(newReport.toJSON(), ['practice_id', 'mentor_id', 'student_id']), 
                        {
                            practice: {
                                connect: { id: newReport.practice_id }
                            },
                            mentor: {
                                connect: { id: newReport.mentor_id }
                            },
                            student: {
                                connect: { id: newReport.student_id }
                            }
                        }
                    ),
                    include: {  
                        practice: {
                            include: { direction_id: true } 
                        },
                        mentor: {
                            include: { group: true } 
                        },
                        student: {
                            include: { group: true } 
                        }
                    }
                });

                return reformatDate(Object.assign(
                    objectRemoveKeys(new Report(query).toJSON(), ['practice_id', 'mentor_id', 'student_id']),
                    { 
                        practice: objectRemoveKeys(
                            Object.assign(query.practice, { direction: query.practice.direction_id }),
                            'direction_id'
                        ),
                        mentor: query.mentor,
                        student: query.student
                    }
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

            const report = await prisma.report.findFirst({
                where: { id: parseInt(id) },
                include: { 
                    practice: {
                        include: { direction_id: true } 
                    },
                    mentor: {
                        include: { group: true } 
                    },
                    student: {
                        include: { group: true } 
                    }
                }
            });

            if (!report) return res.status(404).send();
            
            return res.send(reformatDate(Object.assign(
                objectRemoveKeys(new Report(report).toJSON(), ['practice_id', 'mentor_id', 'student_id']),
                { 
                    practice: objectRemoveKeys(
                        Object.assign(report.practice, { direction: report.practice.direction_id }),
                        'direction_id'
                    ),
                    practice: report.practice,
                    mentor: report.mentor,
                    student: report.student
                }
            )));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params,
                {
                    practice_id,
                    student_id,
                    date,
                    estimation,
                    comment
                } = req.body,
                mentor_id = 1;//req.user.id

            const report = await prisma.report.findFirst({ where: { id: parseInt(id) } });
            
            if (!report) return res.code(404).send();

            if (practice_id) {
                const practiceEntry = await prisma.practice.findFirst({ where: { id: parseInt(practice_id) } });
                if (!practiceEntry) return res.code(400).send();
            }
            
            if (student_id) {
                const studentEntry = await prisma.person.findFirst({ where: { id: parseInt(student_id) } });
                if (!studentEntry) return res.code(400).send();
            }

            const updatedReport = new Report({
                    id: report.id,
                    practice_id: practice_id ?? report.practice_id,
                    mentor_id,
                    student_id: student_id ?? report.student_id,
                    date: date ? new Date(date) : report.date,
                    estimation: estimation ?? report.estimation,
                    comment: comment ?? report.comment
                }),
                query = await prisma.report.update({
                    where: { id: report.id },
                    data: Object.assign(
                        objectRemoveKeys(updatedReport.toJSON(), ['id', 'practice_id', 'mentor_id', 'student_id']), 
                        {
                            practice: {
                                connect: { id: updatedReport.practice_id }
                            },
                            mentor: {
                                connect: { id: updatedReport.mentor_id }
                            },
                            student: {
                                connect: { id: updatedReport.student_id }
                            }
                        }
                    ),
                    include: {  
                        practice: {
                            include: { direction_id: true } 
                        },
                        mentor: {
                            include: { group: true } 
                        },
                        student: {
                            include: { group: true } 
                        }
                    }
                });

                return reformatDate(Object.assign(
                    objectRemoveKeys(new Report(query).toJSON(), ['practice_id', 'mentor_id', 'student_id']),
                    { 
                        practice: objectRemoveKeys(
                            Object.assign(query.practice, { direction: query.practice.direction_id }),
                            'direction_id'
                        ),
                        mentor: query.mentor,
                        student: query.student
                    }
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

            const report = await prisma.report.findFirst({
                where: { id: parseInt(id) },
                include: { 
                    practice: {
                        include: { direction_id: true } 
                    },
                    mentor: {
                        include: { group: true } 
                    },
                    student: {
                        include: { group: true } 
                    }
                }
            });

            if (!report) return res.status(404).send();
            
            const query = await prisma.report.delete({
                where: { id: parseInt(id) },
                include: { 
                    practice: {
                        include: { direction_id: true } 
                    },
                    mentor: {
                        include: { group: true } 
                    },
                    student: {
                        include: { group: true } 
                    }
                }
            });

            return res.send(reformatDate(Object.assign(
                objectRemoveKeys(new Report(query).toJSON(), ['practice_id', 'mentor_id', 'student_id']),
                { 
                    practice: objectRemoveKeys(
                        Object.assign(query.practice, { direction: query.practice.direction_id }),
                        'direction_id'
                    ),
                    practice: query.practice,
                    mentor: query.mentor,
                    student: query.student
                }
            )));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}