import { BaseController } from '../controllers/baseController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/bases/', BaseController.get);
    fastify.post('/bases/', BaseController.create);
    fastify.get('/bases/:id/', BaseController.getInfo);
    fastify.put('/bases/:id/', BaseController.update);
    fastify.delete('/bases/:id/', BaseController.delete);
    done();
}
