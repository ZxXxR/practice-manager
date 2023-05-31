import { PracticeController } from '../controllers/practiceController.js';
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

    fastify.get('/', PracticeController.getAll);
    fastify.post('/', PracticeController.create);
    fastify.get('/:id/', PracticeController.get);
    fastify.put('/:id/', PracticeController.update);
    fastify.delete('/:id/', PracticeController.delete);
    done();
}
