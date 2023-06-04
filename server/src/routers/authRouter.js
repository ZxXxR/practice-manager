import { AuthController } from '../controllers/authController.js';

export default (fastify, opts, done) => {
    fastify.post('/login/', AuthController.login);
    fastify.post('/register/', AuthController.register);
    fastify.get('/logout/', AuthController.logout);
    done();
}