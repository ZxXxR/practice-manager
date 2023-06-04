import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async ({ fastify, accessLevel }) => {
    const userRoles = await prisma.role.findMany({
        where: { 
            id: {
                in: fastify.request.user.roles.map(role => { return role.role_id })
            }
        },
    });
    
    if (!((userRoles.filter(role => role.access_level >= accessLevel)).length)) {
        fastify.reply.code(403).send();
        return false;
    }
}