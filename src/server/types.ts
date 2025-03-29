import { ServerListen } from '@/adapters/server/fastify/types';

interface BuildServer {
  stop: () => Promise<void>;
  listen: (options: ServerListen) => Promise<string>;
}

export { BuildServer };
