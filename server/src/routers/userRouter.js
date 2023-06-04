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

    fastify.get('/', UserController.getAll);
    fastify.post('/', UserController.create);
    fastify.get('/:login/', UserController.get);
    fastify.put('/:userLogin/', UserController.update);
    fastify.delete('/:login/', UserController.delete);
    done();
}
