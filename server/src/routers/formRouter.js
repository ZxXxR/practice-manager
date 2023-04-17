import { FormController } from '../controllers/formController.js';
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

    fastify.get('/forms/', FormController.getAll);
    fastify.post('/forms/', FormController.create);
    fastify.get('/forms/:id/', FormController.get);
    fastify.put('/forms/:id/', FormController.update);
    fastify.delete('/forms/:id/', FormController.delete);
    done();
}
