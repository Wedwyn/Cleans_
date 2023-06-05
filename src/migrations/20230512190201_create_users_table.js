export const up = (knex) => (
    knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('email');
      table.string('password_digest');
    })
  );
  
  export const down = (knex) => knex.schema.dropTable('users');