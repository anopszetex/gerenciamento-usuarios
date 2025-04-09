interface ServerAdapter<Request, Response> {
  post<T = unknown>(
    path: string,
    handler: (req: Request & { body: T }, reply: Response) => void
  ): void;
  get(
    path: string,
    options: {
      preHandler: (req: Request, reply: Response) => Promise<void>;
    },
    handler: (req: Request, reply: Response) => void
  ): void;
}

export { ServerAdapter };
