const RoomsService = {
    getAllRooms(knex) {
      return knex.select('*').from('rooms');
    },
    getById(knex, id) {
      return knex
        .from('rooms')
        .where('id', id)
        .first();
    },
    
    updateRooms(knex, id, newRoomFields) {
      return knex('rooms')
        .where({id})
        .update(newRoomFields);
    },
  };
  
  module.exports = RoomsService