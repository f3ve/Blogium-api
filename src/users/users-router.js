const express = require('express')
const path = require('path')
const UsersService = require('./users-service')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .post('/', jsonBodyParser, (req, res, next) => {
    const {password, username, full_name, email, bio, img, matchPassword} = req.body

    for (const field of ['full_name', 'username', 'email', 'password']) {
      if(!req.body[field]) {
        res.status(400).json({
          error: `Missing '${field}' in request body`
        })
      }
    }

    const passwordError = UsersService.validatePassword(password, matchPassword)
    const usernameError = UsersService.validateUsername(username)
    const emailError = UsersService.validateEmail(email)

    if (passwordError) {
      return res.status(400).json({error: passwordError})
    }

    if(usernameError) {
      return res.status(400).json({error: usernameError})
    }

    if(emailError) {
      return res.status(400).json({error: emailError})
    }

    UsersService.hasUserWithUsername(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUsername => {
        if(hasUserWithUsername)
          return res.status(400).json({error: `Username already taken`})
  
        return UsersService.hashPassword(password)
          .then(hashPassword => {
            const newUser = {
              username, 
              password: hashPassword,
              full_name,
              email,
              bio,
              img,
              date_created: 'now()'
            }

            UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => 
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))  
              )
          })
      })
      .catch(error => {
        next(error)
      })
  })


module.exports = usersRouter