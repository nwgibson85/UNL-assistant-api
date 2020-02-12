const NursesService = {
  getAllNurses(knex) {
    return knex.select('*').from('nurses');
  },
  getById(knex, id) {
    return knex
      .from('nurses')
      .where('id', id)
      .first();
  },
  insertNurse(knex, newNurse) {
    return knex
      .insert(newNurse)
      .into('nurses')
      .returning('*')
      .then(rows => {
        return rows[0];
      })
  },
  deleteNurse(knex, id) {
    return knex('nurse')
      .where({id})
      .delete();
  },
  updateNurse(knex, id, newNurseFields) {
    return knex('nurses')
      .where({id})
      .update(newNurseFields);
  },
};

module.exports = NursesService