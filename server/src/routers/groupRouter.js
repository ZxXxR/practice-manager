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

    fastify.get('/groups/', GroupController.getAll);
    fastify.post('/groups/', GroupController.create);
    fastify.get('/groups/:id/', GroupController.get);
    fastify.put('/groups/:id/', GroupController.update);
    fastify.delete('/groups/:id/', GroupController.delete);
    done();
}
