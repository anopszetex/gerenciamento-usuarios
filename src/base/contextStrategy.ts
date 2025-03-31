import { postgreStrategy } from '@/strategies/postgreStrategy';

import type { Knex } from 'knex';

function createContextStrategy(strategy: ReturnType<typeof postgreStrategy>) {
  return {
    destroy: strategy.destroy,
    create: strategy.create,
    findOne: strategy.findOne,
    findAll: strategy.findAll,
  };
}

function loadDb(conn: Knex) {
  const strategy = postgreStrategy(conn);

  return createContextStrategy(strategy);
}

export { loadDb };
