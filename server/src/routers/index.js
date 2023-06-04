import authRouter from './authRouter.js';
import directionRouter from './directionRouter.js';
import enterpriseRouter from './enterpriseRouter.js';
import groupRouter from './groupRouter.js';
import personRouter from './personRouter.js';
import practiceRouter from './practiceRouter.js';
import assignmentRouter from './assignmentRouter.js';
import reportRouter from './reportRouter.js';
import roleRouter from './roleRouter.js';
import userRouter from './userRouter.js';

export default (fastify, opts, done) => {
    fastify.register(authRouter, { prefix: '/api/auth/' });
    fastify.register(directionRouter, { prefix: '/api/directions/' });
    fastify.register(enterpriseRouter, { prefix: '/api/enterprises/' });
    fastify.register(groupRouter, { prefix: '/api/groups/' });
    fastify.register(personRouter, { prefix: '/api/persons/' });
    fastify.register(assignmentRouter, { prefix: '/api/assignments/' });
    fastify.register(practiceRouter, { prefix: '/api/practices/' });
    fastify.register(reportRouter, { prefix: '/api/reports/' });
    fastify.register(roleRouter, { prefix: '/api/roles/' });
    fastify.register(userRouter, { prefix: '/api/users/' });
    done();
}