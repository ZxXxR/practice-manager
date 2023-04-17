import { DateController } from '../controllers/dateController.js';
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

    fastify.get('/dates/', DateController.getAll);
    fastify.post('/dates/', DateController.create);
    fastify.get('/dates/:id/', DateController.get);
    fastify.put('/dates/:id/', DateController.update);
    fastify.delete('/dates/:id/', DateController.delete);
    done();
}
