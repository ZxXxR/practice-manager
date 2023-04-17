import { DirectionController } from '../controllers/directionController.js';
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

    fastify.get('/directions/', DirectionController.getAll);
    fastify.post('/directions/', DirectionController.create);
    fastify.get('/directions/:id/', DirectionController.get);
    fastify.put('/directions/:id/', DirectionController.update);
    fastify.delete('/directions/:id/', DirectionController.delete);
    done();
}
