import { personController } from '../controllers/personController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/persons/', personController.get);
    fastify.post('/persons/', personController.create);
    fastify.get('/persons/:id/', personController.getInfo);
    fastify.put('/persons/:id/', personController.update);
    fastify.delete('/persons/:id/', personController.delete);
    done();
}
