import { FormController } from '../controllers/formController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/forms/', FormController.get);
    fastify.post('/forms/', FormController.create);
    fastify.get('/forms/:id/', FormController.getInfo);
    fastify.put('/forms/:id/', FormController.update);
    fastify.delete('/forms/:id/', FormController.delete);
    done();
}
