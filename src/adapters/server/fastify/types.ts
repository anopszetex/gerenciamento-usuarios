import type { FastifyPluginOptions } from 'fastify';
import type { Logger } from 'pino';

type ServerListen = { port: number; host?: string };

interface Server {
  listen(options: ServerListen): Promise<string>;
  stop(): Promise<void>;
}

interface Database {
  create<T>(data: T | T[]): Promise<boolean>;
  findOne<T, K extends keyof T>(field: K, value: T[K]): Promise<T | undefined>;
}

interface UserRoutesOptions extends FastifyPluginOptions {
  database: Database;
  logger: Logger;
}

export { Server, ServerListen, Database, UserRoutesOptions };
