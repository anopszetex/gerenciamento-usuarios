import knex, { type Knex } from 'knex';
import { type Logger } from 'pino';

import { resolve } from 'node:path';

import { getDatabaseConfig as config } from './config';

function buildConnectionConfig(): Knex.Config {
  return {
    client: 'pg',
    pool: {
      min: 0,
      max: 5,
      idleTimeoutMillis: 60000,
    },
    connection: {
      host: config.DB_HOST,
      port: config.DB_PORT,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
    },
    migrations: {
      directory: resolve(__dirname, './migrations'),
      extension: 'ts',
      loadExtensions: ['.ts'],
    },
  };
}

function createConnection(logger: Logger) {
  const knexConfig = buildConnectionConfig();

  if (knexConfig?.pool) {
    knexConfig.pool.afterCreate = function (
      _: Knex.Client,
      done: (err?: Error) => void
    ) {
      logger.info(`Connected on ${config.DB_NAME} database`);
      done();
    };
  }

  return knex(knexConfig);
}

export { createConnection, buildConnectionConfig };
