import { DirectionController } from '../controllers/directionController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/directions/', DirectionController.get);
    fastify.post('/directions/', DirectionController.create);
    fastify.get('/directions/:id/', DirectionController.getInfo);
    fastify.put('/directions/:id/', DirectionController.update);
    fastify.delete('/directions/:id/', DirectionController.delete);
    done();
}
