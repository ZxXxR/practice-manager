import { personController } from '../controllers/personController.js';
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

    fastify.get('/persons/', personController.getAll);
    fastify.post('/persons/', personController.create);
    fastify.get('/persons/:id/', personController.get);
    fastify.put('/persons/:id/', personController.update);
    fastify.delete('/persons/:id/', personController.delete);
    done();
}
