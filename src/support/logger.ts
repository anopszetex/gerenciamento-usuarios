import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

const logger = pino({
  level: 'info',
  ...(isDev && { transport: { target: 'pino-pretty' } }),
});

export { logger };
