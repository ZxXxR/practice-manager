import { StudentController } from '../controllers/studentController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/students/', StudentController.get);
    fastify.post('/students/', StudentController.create);
    fastify.get('/students/:id/', StudentController.getInfo);
    fastify.put('/students/:id/', StudentController.update);
    fastify.delete('/students/:id/', StudentController.delete);
    done();
}
