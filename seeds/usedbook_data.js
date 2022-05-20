
const usedBookData = require("../seed_data/usedBook")


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = function (knex) {
  return knex('usedbook')
    .del()
    .then(function () {
      return knex('usedbook').insert(usedBookData);
    })
};
