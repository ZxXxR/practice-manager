import { BaseController } from '../controllers/baseController.js';
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

    fastify.get('/bases/', BaseController.getAll);
    fastify.post('/bases/', BaseController.create);
    fastify.get('/bases/:id/', BaseController.get);
    fastify.put('/bases/:id/', BaseController.update);
    fastify.delete('/bases/:id/', BaseController.delete);
    done();
}
