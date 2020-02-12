const path = require('path');
const xss = require('xss');
const express = require('express');
const techsService = require('./techsService');

const techsRouter = express.Router();
const jsonParser = express.json();

const sterializeTechs = tech => ({
  id: tech.id,
  name: xss(tech.name),
})

techsRouter
    .route('/')
    .get((req, res, next) => {
        techsService.getAllTechs(req.app.get('db'))
        .then(techs => {
            res.json(techs.map(sterializeTechs))
        })
        .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
      for (const field of ['name', 'phone', 'voalte', 'email']) {
        if (!req.body[field]) {
          return res.status(400).send({
            error: { message: `'${field}' is required` }
          })
        }
      }
      
      const newTech = { name, phone, voalte, email, standby, float }
    
      techsService.insertTech(
        req.app.get('db'),
        newTech
      )
        .then(tech => {
          res
            .status(201)
            .location(path.posix.join(req.originalUrl, `/${tech.id}`))
            .json(sterializeFolder(tech))
        })
        .catch(next)
    })

techsRouter
  .route('/:folder_id')
  .all((req, res, next) => {
    techsService.getById(
    req.app.get('db'),
    req.params.tech_id
    )
    .then(tech => {
        if (!tech) {
          return res.status(404).json({
              error: { message: `Tech doesn't exist` }
          })
        }
        res.tech = tech// save the tech for the next middleware
        next() // don't tech to call next so the next middleware happens!
    })
    .catch(next)
  })
  .get((req, res) => {
    res.json(serializeTech(res.Tech))
  })
  .delete((req, res, next) => {
    techsService.deleteTech(
        req.app.get('db'),
        req.params.tech_id
    )
        .then(numRowsAffected => {
          res.status(204).end()
        })
        .catch(next)
  })
  .patch(jsonParser, (req, res, next) => {
    const { name, phone, voalte, email, standby, float } = req.body
    const techToUpdate = { name, phone, voalte, standby, float }
    
    const numberOfValues = Object.values(techToUpdate).filter(Boolean).length
    if (numberOfValues === 0) {
        return res.status(400).json({
            error: {
                message: `Request body must contain name, phone, voalte, and email`
            }
        })
    }
    
    techsService.updateTech(
        req.app.get('db'),
        req.params.tech_id,
        techToUpdate
    )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next)
})

module.exports = techsRouter