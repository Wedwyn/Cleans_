export const up = (knex) => (
    knex.schema.createTable('feedbacks', (table) => {
      table.increments('id').primary();
      table.string('username');
      table.string('text');
      table.integer('rating');
    })
  );
  
  export const down = (knex) => knex.schema.dropTable('feedbacks');