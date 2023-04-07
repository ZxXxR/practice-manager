import { ContractController } from '../controllers/contractController.js';
import apiMiddleware from '../middlewares/apiMiddleware.js';

export default (fastify, opts, done) => {
    fastify.addHook('preHandler', async (request, reply) => {
        await apiMiddleware(request, reply);
    });

    fastify.get('/contracts/', ContractController.get);
    fastify.post('/contracts/', ContractController.create);
    fastify.get('/contracts/:id/', ContractController.getInfo);
    fastify.put('/contracts/:id/', ContractController.update);
    fastify.delete('/contracts/:id/', ContractController.delete);
    done();
}
