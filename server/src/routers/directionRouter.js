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

    fastify.get('/', DirectionController.getAll);
    fastify.post('/', DirectionController.create);
    fastify.get('/:id/', DirectionController.get);
    fastify.put('/:id/', DirectionController.update);
    fastify.delete('/:id/', DirectionController.delete);
    done();
}
