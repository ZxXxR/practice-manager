import { GroupController } from '../controllers/groupController.js';
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

    fastify.get('/', GroupController.getAll);
    fastify.post('/', GroupController.create);
    fastify.get('/:id/', GroupController.get);
    fastify.put('/:id/', GroupController.update);
    fastify.delete('/:id/', GroupController.delete);
    done();
}
