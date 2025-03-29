import 'dotenv/config';

import { buildServer } from './server';

import { logger } from '@/support/logger';

async function start() {
  const server = buildServer(logger);

  const port = Number(process.env.SERVER_PORT ?? 4000);
  const host = process.env.SERVER_HOST ?? '0.0.0.0';

  try {
    const url = await server.listen({ port, host });

    logger.info(`🚀 Server ready at: ${url}`);
  } catch (err) {
    logger.error(`Error starting server ${err}`);
    return Promise.reject(err);
  }
}

start();
