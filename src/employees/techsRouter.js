const express = require('express');
const xss = require('xss');
const path = require('path');
const techsService = require('./techsService');

const techsRouter = express.Router();
const jsonParser = express.json();

const sterilizeTechs = tech => ({
  id: tech.id,
  name: xss(tech.name),
  nick_name: xss(tech.nick_name),
  phone: tech.phone,
  voalte: tech.voalte,
  email: tech.email,
  standby: tech.standby,
  float: tech.float
})

techsRouter 
  .route('/')
  .get((req, res, next) => {
      const knexInstance = req.app.get('db');
      techsService.getAllTechs(knexInstance)
        .then(techs => {
            res
            .status(200)
            .json(techs.map(sterilizeTechs));
        })
        .catch(next);
  })

  .post(jsonParser, (req, res, next) => {
    const { name, nick_name, phone, voalte, email, standby, float} = req.body;
    const requiredFields = {name, nick_name, phone, voalte, email, standby, float};
    const newTech = {name, nick_name, phone, voalte, email, standby, float};

    for (const [key, value] of Object.entries(requiredFields)) {
      if (value === null) {
        return res.status(400).json({
          error: {message: `Missing '${key} in request body`},
        });
      };
    };

    techsService.insertTech(req.app.get('db'), newTech)
        .then(tech => {
            res
                .status(201)
                .location(path.posix.join(req.originalUrl, `/${tech.id}`))
                .json(sterilizeTechs(tech));
        })
        .catch(next);
    });

techsRouter
    .route('/:tech_id')
    .all((req, res, next) => {
        techsService.getById(req.app.get('db'), req.params.tech_id)
            .then(tech => {
                if (!tech) {
                    return res.status(404).json({
                        error: {message: `Tech doesn't exist`}
                    });
                }
                res.tech = tech;
                next();
            })
            .catch(next);
    })
    .get((req, res, next) => {
        res.json(sterilizeTechs(res.tech));
    })
    .delete((req, res, next) => {
        techsService.deleteTechs(req.app.get('db'), req.params.tech_id)
          .then(() => {
            res.status(201).json({success: 'deleted'});
          })
          .catch(next);
    })
    .patch(jsonParser, (req, res) => {
        const {name, nick_name, phone, voalte, email, standby, float} = req.body;
        const techToUpdate = {name, nick_name, phone, voalte, email, standby, float};
      
        const numberOfValues = Object.values(techToUpdate).filter(Boolean).length;
        if (numberOfValues === 0) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain both name and folder_id`
                }
            });
        }
        
        techsService.updateTech(
          req.app.get('db'),
          req.params.tech_id,
          newTechFields
        )
        .then(() => {
          res.status(204).end();
        });   
    });
  


module.exports = techsRouter