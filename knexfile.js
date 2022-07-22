// Update with your config settings.

require("dotenv").config();



/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: process.env.KNEXPASSWORD,
      database: 'booktown_cda',
      charset: 'utf8',
    },
  },
};
