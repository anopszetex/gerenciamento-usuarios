type ServerListen = { port: number; host?: string };

interface Server {
  listen(options: ServerListen): Promise<string>;
  stop(): Promise<void>;
}

export { Server, ServerListen };
