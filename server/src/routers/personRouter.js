import { PersonController } from '../controllers/personController.js';
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

    fastify.get('/', PersonController.getAll);
    fastify.post('/', PersonController.create);
    fastify.get('/:id/', PersonController.get);
    fastify.put('/:id/', PersonController.update);
    fastify.delete('/:id/', PersonController.delete);
    done();
}
