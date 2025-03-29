import closeWithGrace from 'close-with-grace';

import { factoryServer } from '@/adapters/server/fastify';

import type { BuildServer } from './types';
import type { Logger } from 'pino';

function buildServer(logger: Logger): BuildServer {
  const { listen, stop } = factoryServer();

  closeWithGrace({ delay: 500 }, async function ({ signal, err, manual }) {
    if (err) {
      logger.error({ signal, err, manual });
    }

    logger.warn('aborting application');
    await stop();
  });

  return {
    stop,
    listen,
  };
}

export { buildServer };
