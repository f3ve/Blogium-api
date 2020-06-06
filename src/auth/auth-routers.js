const express = require('express')
const AuthService = require('./auth-service')
const {requireAuth} = require('../middleware/jwt-auth')

const authRouter = express.Router()
const jsonBodyParser = express.json()

authRouter
  .post('/login', jsonBodyParser, (req, res, next) => {
    const {username, password } = req.body
    const lgu = {username, password}

    for (const [key, value] of Object.entries(lgu))
      if(value == null) {
        return res.status(400).json({
          error: `Missing '${key}' in request body`
        })
      }

    AuthService.getUserWithUsername(
      req.app.get('db'),
      lgu.username
    )
      .then(dbu => {
        if(!dbu)
          return res.status(400).json({
            error: 'Incorrect Username or password'
          })

        return AuthService.comparePassword(lgu.password, dbu.password)
          .then(match => {
            if(!match)
              return res.status(400).json({
                error: 'Incorrect Username or password'
              })
            
            const sub = dbu.username
            const payload = {id: dbu.id}
            res.send({
              authToken: AuthService.createJwt(sub, payload)
            })
          })
      })
      .catch(next)
  })

authRouter
  .post('/refresh', requireAuth, (req, res) => {
    const sub = req.user.username
    const payload = {id: req.user.username}
    res.send({
      authToken: AuthService.createJwt(sub, payload)
    })
  })

module.exports = authRouter