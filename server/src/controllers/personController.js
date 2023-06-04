import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Person } from '../models/Person.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';
import reformatDate from '../utils/reformatDate.js';

const prisma = new PrismaClient();

export class PersonController extends Controller {
    static async getAll(req, res) {
        try {
            const persons = await prisma.person.findMany({ include: { group: true }});

            return persons.map(person => {
                return reformatDate(Object.assign(
                    objectRemoveKeys(new Person(person).toJSON(), 'group_id'),
                    { group: person.group }
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
                first_name,
                last_name,
                second_name,
                photo,
                phone_number,
                email,
                position,
                group_id,
                comment
            } = req.body;

            if (
                !first_name || !last_name  || !group_id || position &&
                !(['student', 'responsible', 'mentor', 'representative', 'admin'].includes(position))
            ) return res.code(400).send();

            const candidate = await prisma.person.findFirst({ where: { 
                OR: [
                    { email: { equals: email } },
                    { phone_number: { equals: phone_number }}
                ]
            }}),
                groupEntry = await prisma.group.findFirst({ where: { id: parseInt(group_id) } });

            if (candidate) return res.code(409).send();
            if (!groupEntry)  return res.code(400).send();

            const newPerson = new Person({
                    first_name,
                    last_name,
                    second_name: second_name ?? '',
                    photo: photo ?? '',
                    phone_number: phone_number ?? '',
                    email: email ?? '',
                    position: position ?? 'student',
                    group_id,
                    comment: comment ?? ''
                }),
                query = await prisma.person.create({
                    data: Object.assign(
                        objectRemoveKeys(newPerson.toJSON(), 'group_id'), 
                        {
                            group: {
                                connect: { id: newPerson.group_id }
                            }
                        }
                    ),
                    include: { group: true }
                });

            return res.send(reformatDate(
                Object.assign(
                    objectRemoveKeys(new Person(query).toJSON(), 'group_id'),
                    { group: query.group }
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

            const person = await prisma.person.findFirst({ where: { id: parseInt(id) }, include: { group: true } });

            if (!person) return res.status(404).send();

            return res.send(reformatDate(
                Object.assign(
                    objectRemoveKeys(new Person(person).toJSON(), 'group_id'),
                    { group: person.group }
                )
            ));
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

            const person = await prisma.person.findFirst({ where: { id: parseInt(id) } });

            if (!person) return res.status(404).send();

            const dependenceAssignmentsEntry = await prisma.practiceAssignments.findFirst({
                    where: {
                        OR: [
                            { responsible_id: person.id },
                            { mentor_id: person.id },
                            { student_id: person.id }
                        ]
                    } 
                }),
                dependenceEnterprisesEntry = await prisma.enterprise.findFirst({
                    where: { representative_id: person.id } 
                }),
                dependenceReportsEntry = await prisma.report.findFirst({
                    where: {
                        OR: [
                            { mentor_id: person.id },
                            { student_id: person.id }
                        ]
                    } 
                });

            if (dependenceAssignmentsEntry || dependenceEnterprisesEntry || dependenceReportsEntry) return res.status(409).send();

            const query = await prisma.person.delete({ where: { id: parseInt(id) }, include: { group: true } });

            return res.send(reformatDate(
                Object.assign(
                    objectRemoveKeys(new Person(query).toJSON(), 'group_id'),
                    { group: query.group }
                )
            ));
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}