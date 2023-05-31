import { EnterpriseController } from '../controllers/enterpriseController.js';
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

    fastify.get('/', EnterpriseController.getAll);
    fastify.post('/', EnterpriseController.create);
    fastify.get('/:id/', EnterpriseController.get);
    fastify.put('/:id/', EnterpriseController.update);
    fastify.delete('/:id/', EnterpriseController.delete);
    done();
}
