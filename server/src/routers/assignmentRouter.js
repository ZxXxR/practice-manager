import { AssignmentController } from '../controllers/assignmentController.js';
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

    fastify.get('/', AssignmentController.getAll);
    fastify.post('/', AssignmentController.create);
    fastify.get('/:id/', AssignmentController.get);
    fastify.put('/:id/', AssignmentController.update);
    fastify.delete('/:id/', AssignmentController.delete);
    done();
}
