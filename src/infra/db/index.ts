import knex, { type Knex } from 'knex';
import { type Logger } from 'pino';

import { resolve } from 'node:path';

import { getDatabaseConfig as config } from './config';

function buildConnectionConfig(logger: Logger): Knex.Config {
  return {
    client: 'pg',
    pool: {
      min: 0,
      max: 5,
      idleTimeoutMillis: 60000,
      afterCreate: (_: Knex.Client, done: (err?: Error) => void) => {
        logger.info(`Connected on ${config.DB_NAME} database`);
        done();
      },
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
      loadExtensions: ['ts'],
    },
  };
}

function createConnection(logger: Logger) {
  return knex(buildConnectionConfig(logger));
}

export { createConnection };
