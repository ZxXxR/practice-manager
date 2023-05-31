import { RoleController } from '../controllers/roleController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
        await roleMiddleware({
            fastify: { request, reply },
            accessLevel: 100
        });
    });

    fastify.get('/', RoleController.getAll);
    fastify.post('/', RoleController.create);
    fastify.get('/:id/', RoleController.get);
    fastify.put('/:id/', RoleController.update);
    fastify.delete('/:id/', RoleController.delete);
    done();
}
