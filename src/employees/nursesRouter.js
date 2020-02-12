const express = require('express');
const xss = require('xss');
const path = require('path');
const NursesService = require('./nursesService');

const nursesRouter = express.Router();
const jsonParser = express.json();

const sterilizeNurses = nurse => ({
  id: nurse.id,
  name: xss(nurse.name),
  nick_name: xss(nurse.nick_name),
  phone: nurse.phone,
  voalte: nurse.voalte,
  email: nurse.email,
  standby: nurse.standby,
  tripled: nurse.tripled,
  float: nurse.float
})

nursesRouter 
  .route('/')
  .get((req, res, next) => {
      const knexInstance = req.app.get('db');
      NursesService.getAllNurses(knexInstance)
        .then(nurses => {
            res
            .status(200)
            .json(nurses.map(sterilizeNurses));
        })
        .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { name, nick_name, phone, voalte, email, standby, tripled, float} = req.body;
    const requiredFields = {name, nick_name, phone, voalte, email, standby, tripled, float};
    const newNurse = {name, nick_name, phone, voalte, email, standby, tripled, float};

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === null) {
        return res.status(400).json({
          error: {message: `Missing '${key} in request body`},
        });
      };
    };

    NursesService.insertNurse(req.app.get('db'), newNurse)
          .then(nurse => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${nurse.id}`))
              .json(sterilizeNurses(nurse));
          })
          .catch(next);
    });

nursesRouter
  .route('/:nurse_id')
  .all((req, res, next) => {
    NursesService.getById(req.app.get('db'), req.params.nurse_id)
      .then(nurse => {
        if (!nurse) {
          return res.status(404).json({
              error: {message: `Nurse doesn't exist`}
          });
        }
        res.nurse = nurse;
        next();
      })
      .catch(next);
  })
    .get((req, res, next) => {
      res.json(sterilizeNurses(res.nurse));
    })
    .delete((req, res, next) => {
      NursesService.deleteNurse(req.app.get('db'), req.params.nurse_id)
        .then(() => {
          res.status(201).json({success: 'deleted'});
        })
        .catch(next);
    })
    .patch(jsonParser, (req, res) => {
      const {name, nick_name, phone, voalte, email, standby, tripled, float} = req.body;
      const nurseToUpdate = {name, nick_name, phone, voalte, email, standby, tripled, float};
    
      const numberOfValues = Object.values(nurseToUpdate).filter(Boolean).length;
      if (numberOfValues === 0) {
          return res.status(400).json({
              error: {
                  message: `Request body must contain both name and folder_id`
              }
          });
      }
      
      NursesService.updateNurse(
        req.app.get('db'),
        req.params.nurse_id,
        newNurseFields
      )
      .then(() => {
        res.status(204).end();
      });   
  });
  
  module.exports = nursesRouter;