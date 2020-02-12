const techsService = {
    getAllTechs(knex) {
        return knex.select('*').from('techs')
    },
    insertTech(knex, newTech) {
        return knex
            .insert(newTech)
            .into('techs')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    getById(knex, id) {
        return knex
            .from('techs')
            .select('*')
            .where('id', id)
            .first()
    },
    deleteTechs(knex, id) {
      return knex('techs')
        .where({ id })
        .delete()
    },
    updateTech(knex, id, newTechFields) {
      return knex('techs')
        .where({ id })
        .update(newTechFields)
    },
}
module.exports = techsService