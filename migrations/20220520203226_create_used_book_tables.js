/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema
      .createTable('usedbook', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('author').notNullable();
        table.string('image').notNullable();
        table.string('price').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.down = function (knex) {
    return knex.schema.dropTable('usedbook');
  };
