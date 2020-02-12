const express = require('express');
// const xss = require('xss');
// const path = require('path');
const RoomsService = require('./RoomsService');

const roomsRouter = express.Router();
const jsonParser = express.json();

const serializeRoom = room => ({
  id: room.id,
  number: room.number,
  phone: room.phone,
  status: room.status,
  lift_room: room.lift_room,
  nurse_id: room.nurse_id,
  tech_id: room.tech_id
})

roomsRouter 
  .route('/')
  .get((req, res, next) => {
      const knexInstance = req.app.get('db');
      RoomsService.getAllRooms(knexInstance)
        .then(rooms => {
            res
            .status(200)
            .json(rooms.map(serializeRoom));
        })
        .catch(next);
  })

roomsRouter
  .route('/:room_id')
  .all((req, res, next) => {
    RoomsService.getById(req.app.get('db'), req.params.room_id)
      .then(room => {
        if (!room) {
          return res.status(404).json({
              error: {message: `Room doesn't exist`}
          });
        }
        res.room = room;
        next();
      })
      .catch(next);
  })
    .get((req, res, next) => {
      res.json(serializeRoom(res.room));
    })
    
    .patch(jsonParser, (req, res) => {
      const {number, phone, status, lift_room, nurse_id, tech_id} = req.body;
      const roomToUpdate = {number, phone, status, lift_room, nurse_id, tech_id};
    
      const numberOfValues = Object.values(roomToUpdate).filter(Boolean).length;
      if (numberOfValues === 0) {
          return res.status(400).json({
              error: {
                  message: `Request body must contain all of the following: number, status, lift_room, nurse_id, tech_id`
              }
          });
      }
      
      RoomsService.updateRoom(
        req.app.get('db'),
        req.params.room_id,
        newRoomFields
      )
      .then(() => {
        res.status(204).end();
      });   
  });
  
  module.exports = roomsRouter;