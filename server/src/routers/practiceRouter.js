import { PracticeController } from '../controllers/practiceController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/practices/', PracticeController.get);
    fastify.post('/practices/', PracticeController.create);
    fastify.get('/practices/:id/', PracticeController.getInfo);
    fastify.put('/practices/:id/', PracticeController.update);
    fastify.delete('/practices/:id/', PracticeController.delete);
    done();
}
