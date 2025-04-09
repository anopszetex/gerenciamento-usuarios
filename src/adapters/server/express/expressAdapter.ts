import { ServerAdapter } from '@/adapters/types';
import type { Express } from 'express';
import type { Request, Response } from 'express';

function expressAdapter(app: Express): ServerAdapter<Request, Response> {
  return {
    post<T = unknown>(
      path: string,
      handler: (req: Request & { body: T }, reply: Response) => void
    ) {
      app.post(path, handler);
    },
    get(
      path: string,
      options: {
        preHandler: (req: Request, reply: Response) => Promise<void>;
      },
      handler: (req: Request, reply: Response) => void
    ) {
      app.get(
        path,
        options.preHandler ??
          ((req, reply, next) => {
            options.preHandler(req, reply);
            next();
          }),
        handler
      );
    },
  };
}

export { expressAdapter };
