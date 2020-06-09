require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config');
const usersRouter = require('./users/users-router')
const authRouter = require('./auth/auth-routers')
const postsRouter = require('./posts/posts-router')
const commentsRouter = require('./comments/comments-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())
app.use(function errorHandler(error, req, res, next) {
  let response 
  NODE_ENV === 'production'
    ? response = { error: { message: 'server error' } }
    : console.error(error); 
      response = { message: error.message, error }
  res.status(500).json(response)
})

app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)

// app.get('/', (req, res) => {
//   res.send('Hello, world!')
// })

module.exports = app