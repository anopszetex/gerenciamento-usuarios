import type { FastifyInstance } from 'fastify';

function userRoutes(app: FastifyInstance) {
  // app.post('/register', req => {
  // const body = req.body;
  // console.log({ body });
  // });

  // app.post('/login', (req, reply) => {});

  app.get('/users', () => {
    return [];
  });
}

export { userRoutes };
