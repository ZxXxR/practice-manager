import { StudentController } from '../controllers/studentController.js';
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

    fastify.get('/students/', StudentController.getAll);
    fastify.post('/students/', StudentController.create);
    fastify.get('/students/:id/', StudentController.get);
    fastify.put('/students/:id/', StudentController.update);
    fastify.delete('/students/:id/', StudentController.delete);
    done();
}
