import { DateController } from '../controllers/dateController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/dates/', DateController.get);
    fastify.post('/dates/', DateController.create);
    fastify.get('/dates/:id/', DateController.getInfo);
    fastify.put('/dates/:id/', DateController.update);
    fastify.delete('/dates/:id/', DateController.delete);
    done();
}
