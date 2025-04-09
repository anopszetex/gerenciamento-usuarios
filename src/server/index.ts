import closeWithGrace from 'close-with-grace';

import { factoryServer } from '@/adapters/server/fastify';
// import { factoryServer } from '@/adapters/server/express';

import { createConnection } from '@/infra/db';
import { loadDb } from '@/base/contextStrategy';

import type { BuildServer } from './types';
import type { Logger } from 'pino';

function buildServer(logger: Logger): BuildServer {
  const connection = createConnection(logger);
  const database = loadDb(connection);

  const { listen, stop } = factoryServer(database, logger);

  closeWithGrace({ delay: 500 }, async function () {
    logger.warn('aborting application');
    await database.destroy();
    await stop();
  });

  return {
    stop,
    listen,
  };
}

export { buildServer };
