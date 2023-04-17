import { ContractController } from '../controllers/contractController.js';
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

    fastify.get('/contracts/', ContractController.getAll);
    fastify.post('/contracts/', ContractController.create);
    fastify.get('/contracts/:id/', ContractController.get);
    fastify.put('/contracts/:id/', ContractController.update);
    fastify.delete('/contracts/:id/', ContractController.delete);
    done();
}
