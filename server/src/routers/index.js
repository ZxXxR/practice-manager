import baseRouter from './baseRouter.js';
import contractRouter from './contractRouter.js';
import dateRouter from './dateRouter.js';
import directionRouter from './directionRouter.js';
import formRouter from './formRouter.js';
import groupRouter from './groupRouter.js';
import practiceRouter from './practiceRouter.js';
import personRouter from './personRouter.js';
import studentRouter from './studentRouter.js';
import userRouter from './userRouter.js';

export default (fastify, opts, done) => {
    fastify.register(baseRouter);
    fastify.register(contractRouter);
    fastify.register(dateRouter);
    fastify.register(directionRouter);
    fastify.register(formRouter);
    fastify.register(groupRouter);
    fastify.register(practiceRouter);
    fastify.register(personRouter);
    fastify.register(studentRouter);
    fastify.register(userRouter);
    done();
}