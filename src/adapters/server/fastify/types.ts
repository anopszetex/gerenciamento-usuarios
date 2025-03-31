import type { FastifyPluginOptions } from 'fastify';
import type { Logger } from 'pino';

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
}

interface UserRoutesOptions extends FastifyPluginOptions {
  database: Database;
  logger: Logger;
}

export { Server, ServerListen, Database, UserRoutesOptions };
