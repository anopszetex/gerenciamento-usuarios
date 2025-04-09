import express from 'express';

import { expressAdapter } from './expressAdapter';

import { userRoutes } from '@/routes';

import type { Express, Request, Response } from 'express';
import type { Server as HTTPServer } from 'http';
import type { Logger } from 'pino';
import { ServerAdapter } from '@/adapters/types';

type ServerListen = { port: number; host?: string };

interface Server {
  listen(options: ServerListen): Promise<string>;
  stop(): Promise<void>;
}

interface Database {
  destroy(): Promise<void>;
  create<T>(table: string, data: T | T[]): Promise<boolean>;
  findOne<T>(
    table: string,
    field: keyof T,
    value: T[keyof T]
  ): Promise<T | undefined>;
  findAll<T>(table: string, columns: (keyof T)[] | ['*']): Promise<T[]>;
}

function factoryServer(database: Database, logger: Logger): Server {
  const expressApp = express();
  expressApp.use(express.json());

  const router = express.Router();
  expressApp.use('/api', router);

  const app = expressAdapter(router as unknown as Express);

  userRoutes<Request, Response>(app, { database, logger });

  let serverInstance: HTTPServer | null = null;

  return {
    async listen(options: ServerListen): Promise<string> {
      const { port, host = '0.0.0.0' } = options;

      await new Promise<void>((resolve, reject) => {
        const newApp = expressApp.listen(port, host, error => {
          if (error) {
            reject(error);
          }

          serverInstance = newApp;

          resolve();
        });
      });

      const url = serverInstance?.address();

      if (typeof url === 'string') {
        return url;
      }

      return `${host}:${port}`;
    },
    async stop(): Promise<void> {
      if (!serverInstance) {
        return;
      }

      await new Promise<void>((resolve, reject) => {
        serverInstance?.close(err => {
          if (err) {
            reject(err);
          }

          logger.info('Server closed');
          resolve();
        });
      });
    },
  };
}

export { factoryServer };
