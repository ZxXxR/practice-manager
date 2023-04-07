import { UserController } from '../controllers/userController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/users/', UserController.get);
    fastify.post('/users/', UserController.create);
    fastify.get('/users/:login/', UserController.getInfo);
    fastify.put('/users/:login/', UserController.update);
    fastify.delete('/users/:login/', UserController.delete);
    done();
}
