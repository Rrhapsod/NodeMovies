export function up(knex)  {   return knex.schema.createTable("movies", (table) => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.integer("rating");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });   }

export function down(knex) { return knex.schema.dropTable("movies"); }
