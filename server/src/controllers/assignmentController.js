import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { PracticeAssignment } from '../models/PracticeAssignment.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';
import reformatDate from '../utils/reformatDate.js';

const prisma = new PrismaClient();

export class AssignmentController extends Controller {
    static async getAll(req, res) {
        try {
            const assignments = await prisma.practiceAssignments.findMany({
                include: { 
                    practice: {
                        include: { direction_id: true } 
                    },
                    enterprise: {
                        include: {
                            representative: {
                                include: { group: true }
                            }
                        }
                    },
                    responsible:  {
                        include: { group: true } 
                    },
                    mentor: {
                        include: { group: true } 
                    },
                    student: {
                        include: { group: true } 
                    }
                }
            });

            return assignments.map(assignment => {
                return reformatDate(Object.assign(
                    objectRemoveKeys(
                        new PracticeAssignment(assignment).toJSON(), 
                        ['practice_id', 'enterprise_id', 'responsible_id', 'mentor_id', 'student_id']
                    ),
                    { 
                        practice: objectRemoveKeys(
                            Object.assign(assignment.practice, { direction: assignment.practice.direction_id }),
                            'direction_id'
                        ),
                        enterprise: assignment.enterprise,
                        responsible: assignment.responsible,
                        mentor: assignment.mentor,
                        student: assignment.student
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
                enterprise_id,
                responsible_id,
                mentor_id,
                student_id,
                contract_number
            } = req.body;

            if (
                !practice_id || !enterprise_id || !responsible_id || !student_id || !contract_number
            ) return res.code(400).send();

            const candidate = await prisma.practiceAssignments.findFirst({ where: { 
                AND: [
                    { practice_id: { equals: practice_id }},
                    { enterprise_id: { equals: enterprise_id }},
                    { responsible_id: { equals: responsible_id }},
                    { mentor_id: { equals: mentor_id }},
                    { student_id: { equals: student_id }},
                    { contract_number: { equals: contract_number }}
                ]
            }});

            if (candidate) return res.code(409).send();

            const practiceEntry = await prisma.practice.findFirst({ where: { id: parseInt(practice_id) } }),
                enterpriseEntry = await prisma.enterprise.findFirst({ where: { id: parseInt(enterprise_id) } }),
                personsEntry = await prisma.person.findMany({ where: { id: { in: [ responsible_id, mentor_id, student_id ] } } });

            if (!practiceEntry || !enterpriseEntry || personsEntry?.length != 3)  return res.code(400).send();

            const newPracticeAssignment = new PracticeAssignment({
                    practice_id,
                    enterprise_id,
                    responsible_id,
                    mentor_id,
                    student_id,
                    contract_number
                }),
                query = await prisma.practiceAssignments.create({
                    data: Object.assign(
                        objectRemoveKeys(
                            newPracticeAssignment.toJSON(),
                            ['practice_id', 'enterprise_id', 'responsible_id', 'mentor_id', 'student_id']
                        ), 
                        {
                            practice: {
                                connect: { id: newPracticeAssignment.practice_id }
                            },
                            enterprise: { 
                                connect: { id: newPracticeAssignment.enterprise_id }
                            },
                            responsible:  { 
                                connect: { id: newPracticeAssignment.responsible_id }
                            },
                            mentor: {
                                connect: { id: newPracticeAssignment.mentor_id}
                            },
                            student: {
                                connect: { id: newPracticeAssignment.student_id}
                            }
                        }
                    ),
                    include: {  
                        practice: {
                            include: { direction_id: true } 
                        },
                        enterprise: {
                            include: {
                                representative: {
                                    include: { group: true }
                                }
                            }
                        },
                        responsible:  {
                            include: { group: true } 
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
                    objectRemoveKeys(
                        new PracticeAssignment(query).toJSON(), 
                        ['practice_id', 'enterprise_id', 'responsible_id', 'mentor_id', 'student_id']
                    ),
                    { 
                        practice: objectRemoveKeys(
                            Object.assign(query.practice, { direction: query.practice.direction_id }),
                            'direction_id'
                        ),
                        enterprise: query.enterprise,
                        responsible: query.responsible,
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

            const assignment = await prisma.practiceAssignments.findFirst({
                where: { id: parseInt(id) },
                include: { 
                    practice: {
                        include: { direction_id: true } 
                    },
                    enterprise: {
                        include: {
                            representative: {
                                include: { group: true }
                            }
                        }
                    },
                    responsible:  {
                        include: { group: true } 
                    },
                    mentor: {
                        include: { group: true } 
                    },
                    student: {
                        include: { group: true } 
                    }
                }
            });

            if (!assignment) return res.status(404).send();

            return reformatDate(Object.assign(
                objectRemoveKeys(
                    new PracticeAssignment(assignment).toJSON(), 
                    ['practice_id', 'enterprise_id', 'responsible_id', 'mentor_id', 'student_id']
                ),
                { 
                    practice: objectRemoveKeys(
                        Object.assign(assignment.practice, { direction: assignment.practice.direction_id }),
                        'direction_id'
                    ),
                    enterprise: assignment.enterprise,
                    responsible: assignment.responsible,
                    mentor: assignment.mentor,
                    student: assignment.student
                }
            ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    // update
    // delete
}