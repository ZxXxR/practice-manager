import { ReportController } from '../controllers/reportController.js';
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

    fastify.get('/', ReportController.getAll);
    fastify.post('/', ReportController.create);
    fastify.get('/:id/', ReportController.get);
    fastify.put('/:id/', ReportController.update);
    fastify.delete('/:id/', ReportController.delete);
    done();
}
