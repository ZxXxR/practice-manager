import { GroupController } from '../controllers/groupController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/groups/', GroupController.get);
    fastify.post('/groups/', GroupController.create);
    fastify.get('/groups/:id/', GroupController.getInfo);
    fastify.put('/groups/:id/', GroupController.update);
    fastify.delete('/groups/:id/', GroupController.delete);
    done();
}
