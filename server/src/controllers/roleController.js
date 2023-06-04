import { PrismaClient } from '@prisma/client';
import { Role } from '../models/Role.js';

const prisma = new PrismaClient();

export class RoleController {
    static async getAll(req, res) {
        try {
            return await prisma.role.findMany({});
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async create(req, res) {
        try {
            const { name, access_level, is_default } = req.body;

            if (!name) return res.code(400).send();

            const candidate = await prisma.role.findFirst({ where: { name } });

            if (candidate) return res.code(409).send();

            const newRole = new Role({
                    name,
                    access_level: access_level ?? 0,
                    is_default: is_default ?? false
                }),
                query = await prisma.role.create({
                    data: newRole.toJSON()
                });

            return res.send(new Role(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async get(req, res) {
        try {
            const { id } = req.params;

            if (!id) return res.code(400).send();

            const role = await prisma.role.findFirst({ where: { id: parseInt(id) } });

            if (!role) return res.status(404).send();

            return res.send(new Role(role).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params,
                { name, access_level, is_default } = req.body;

            const role = await prisma.role.findFirst({ where: { id: parseInt(id) } }),
                candidate = await prisma.role.findFirst({ where: { name } });

            if (!role) return res.code(404).send();
            if (candidate && role.name != name) return res.code(409).send();

            const updatedRole = new Role({
                    id: role.id,
                    name: name ?? role.name,
                    access_level: access_level ?? role.access_level,
                    is_default: is_default ?? role.is_default
                }),
                query = await prisma.role.update({
                    where: { id: role.id },
                    data: updatedRole.toJSON()
                });

            return res.send(new Role(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
    
    static async delete(req, res) {
        try {
            const { id, cascade } = req.params;

            if (!id) return res.code(400).send();

            const role = await prisma.role.findFirst({ where: { id: parseInt(id) } });

            if (!role) return res.status(404).send();

            const dependenceEntry = await prisma.roleAssignments.findFirst({ where: { role_id: role.id } });

            if (dependenceEntry) {
                if (!cascade || cascade != true ) return res.status(409).send();

                await prisma.roleAssignments.deleteMany({ where: { role_id: role.id } });
            }

            const query = await prisma.role.delete({ where: { id: role.id } });

            return res.send(new Role(query).toJSON());
        } catch (error) {
            console.error(error.toString());
            return res.code(500).send();
        }
    }
}