const getDatabaseConfig = Object.freeze({
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_PORT: Number(process.env.DB_PORT ?? 5433),
  DB_USER: process.env.DB_USER ?? 'root',
  DB_PASSWORD: process.env.DB_PASSWORD ?? 'root',
  DB_NAME: process.env.DB_NAME ?? 'users',
});

export { getDatabaseConfig };
