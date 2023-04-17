import { UserController } from '../controllers/userController.js';
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

    fastify.get('/users/', UserController.getAll);
    fastify.post('/users/', UserController.create);
    fastify.get('/users/:login/', UserController.get);
    fastify.put('/users/:login/', UserController.update);
    fastify.delete('/users/:login/', UserController.delete);
    done();
}
