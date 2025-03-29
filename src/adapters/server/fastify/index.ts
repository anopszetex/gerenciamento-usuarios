import fastify from 'fastify';

import type { Server, ServerListen } from './types';

function factoryServer(): Server {
  const app = fastify({
    logger: false,
  });

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
