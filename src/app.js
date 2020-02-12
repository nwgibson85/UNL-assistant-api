require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const errorHandler = require('./errorHandler')
const nursesRouter = require('./employees/nursesRouter.js')
const techsRouter = require('./employees/techsRouter')
// const roomsRouter = require('./rooms/roomsRouter')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.use('/api', nursesRouter)
app.use('/api', techsRouter)
// app.use('/api', roomsRouter)
app.use(errorHandler)

module.exports = app