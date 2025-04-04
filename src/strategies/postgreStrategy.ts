import type { Knex } from 'knex';

function postgreStrategy(conn: Knex) {
  return {
    async destroy(): Promise<void> {
      await conn.destroy();
    },
    async create<T>(table: string, data: T | T[]) {
      const res = await conn(table).insert(data);
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
    async findAll<T>(
      table: string,
      columns: (keyof T)[] | ['*']
    ): Promise<T[]> {
      const list = (await conn(table).select(columns)) as T[];
      return list;
    },
  };
}

export { postgreStrategy };
