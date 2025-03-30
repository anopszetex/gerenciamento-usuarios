import type { Knex } from 'knex';

function postgreStrategy(conn: Knex) {
  return {
    async destroy(): Promise<void> {
      await conn.destroy();
    },
    async create<T>(data: T | T[]) {
      // console.log({ data });
      // await conn.raw('SELECT NOW();').catch(err => console.error(err.message));

      const res = await conn('usuarios').insert(data);
      return !!res;
    },
    async findOne<T, K extends keyof T>(
      field: K,
      value: T[K]
    ): Promise<T | undefined> {
      return conn('usuarios')
        .where({ [field]: value })
        .first() as T | undefined;
    },
  };
}

export { postgreStrategy };
