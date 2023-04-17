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

    fastify.get('/practices/', PracticeController.getAll);
    fastify.post('/practices/', PracticeController.create);
    fastify.get('/practices/:id/', PracticeController.get);
    fastify.put('/practices/:id/', PracticeController.update);
    fastify.delete('/practices/:id/', PracticeController.delete);
    done();
}
