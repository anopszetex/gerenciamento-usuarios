import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('usuarios', table => {
    table.increments('id').primary();
    table.string('nome', 50).notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('senha', 200).notNullable();
    table.string('cpf', 20).notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('usuarios');
}
