import fastify from 'fastify';

import type { Server, ServerListen } from './types';

import { userRoutes } from '@/routes';

function factoryServer(): Server {
  const app = fastify({
    logger: false,
  });

  app.register(userRoutes, { prefix: '/api' });

  return {
    async listen(options: ServerListen): Promise<string> {
      const { port, host } = options;

      return app.listen({ port, host });
    },
    async stop(): Promise<void> {
      await app.close();
    },
  };
}

export { factoryServer };
