import type { Knex } from 'knex';

function postgreStrategy(conn: Knex) {
  return {
    async destroy(): Promise<void> {
      await conn.destroy();
    },
    async create<T>(data: T | T[]) {
      const res = await conn('usuarios').insert(data);
      return !!res;
    },
    async findOne<T>(
      table: string,
      field: keyof T,
      value: T[keyof T]
    ): Promise<T | undefined> {
      return conn(table)
        .where({ [field]: value })
        .first() as T | undefined;
    },
  };
}

export { postgreStrategy };
