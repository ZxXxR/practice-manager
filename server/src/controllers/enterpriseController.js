import { Controller } from './controller.js';
import { PrismaClient } from '@prisma/client';
import { Enterprise } from '../models/Enterprise.js';
import objectRemoveKeys from '../utils/objectRemoveKeys.js';
import reformatDate from '../utils/reformatDate.js';

const prisma = new PrismaClient();

export class EnterpriseController extends Controller {
    static async getAll(req, res) {
        try {
            const enterprises = await prisma.enterprise.findMany({ 
                include: { 
                    representative: {
                        include: { group: true } 
                    } 
                }
            });

            return enterprises.map(enterprise => {
                return Object.assign(
                    objectRemoveKeys(new Enterprise(enterprise).toJSON(), 'representative_id'),
                    { representative: enterprise.representative }
                );
            });
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const {
                representative_id,
                legal_form,
                name,
                ogrn,
                inn,
                phone_number,
                email,
                legal_address,
                comment
            } = req.body;

            if (!representative_id || !legal_form || !name) return res.code(400).send();

            const candidate = await prisma.enterprise.findFirst({ where: { 
                OR: [
                    { ogrn: { equals: ogrn } },
                    { inn: { equals: inn }},
                    { name: { equals: name }}
                ]
            }}),
                representativeEntry = await prisma.person.findFirst({ where: { id: parseInt(representative_id) } });

            if (candidate) return res.code(409).send();
            if (!representativeEntry)  return res.code(400).send();

            const newEnterprise = new Enterprise({
                    representative_id,
                    legal_form,
                    name,
                    ogrn: ogrn ?? '',
                    inn: inn ?? '',
                    phone_number: phone_number ?? '',
                    email: email ?? '',
                    legal_address: legal_address ?? '',
                    comment: comment ?? ''
                }),
                query = await prisma.enterprise.create({
                    data: Object.assign(
                        objectRemoveKeys(newEnterprise.toJSON(), 'representative_id'), 
                        {
                            representative: {
                                connect: { id: newEnterprise.representative_id }
                            }
                        }
                    ),
                    include: { 
                        representative: { include: { group: true } }  
                    }
                });

            return res.send(reformatDate(
                Object.assign(
                    new Enterprise(query).toJSON(),
                    { group_id: query.group }
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

            const enterprise = await prisma.enterprise.findFirst({ 
                where: { id: parseInt(id) }, 
                include: { 
                    representative: { include: { group: true } }  
                } 
            });

            if (!enterprise) return res.status(404).send();

            return Object.assign(
                objectRemoveKeys(new Enterprise(enterprise).toJSON(), 'representative_id'),
                { representative: enterprise.representative }
            );
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

            const enterprise = await prisma.enterprise.findFirst({ where: { id: parseInt(id) } });

            if (!enterprise) return res.status(404).send();

            const dependenceEntry = await prisma.practiceAssignments.findFirst({ where: { enterprise_id: enterprise.id } });

            if (dependenceEntry) return res.status(409).send();

            const query = await prisma.enterprise.delete({ 
                where: { id: enterprise.id }, 
                include: { 
                    representative: { include: { group: true } }  
                } 
            });

            return Object.assign(
                objectRemoveKeys(new Enterprise(query).toJSON(), 'representative_id'),
                { representative: query.representative }
            );
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}