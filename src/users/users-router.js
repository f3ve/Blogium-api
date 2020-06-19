const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const {requireAuth} = require('../middleware/jwt-auth')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
    const {password, username, full_name, email, bio, matchPassword} = req.body

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
              img: 'https://firebasestorage.googleapis.com/v0/b/blogium-c1c36.appspot.com/o/default.png?alt=media&token=726bde4d-720e-44b0-9c36-d5ac25380046',
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
  .get((req, res, next) => {
    UsersService.getAllUsers(req.app.get('db'))
      .then(usrs => {
        res.json(usrs.map(UsersService.serializeUser))
      })
      .catch(err => next(err))
  })

  usersRouter
    .route('/:user_id')
    .all(checkUserExists)
    .get((req, res) => {
      res.json(UsersService.serializeUser(res.user))
    })
    .patch(requireAuth, jsonBodyParser, (req, res, next) => {
      const {full_name, bio, img, email} = req.body
      const userToUpdate = {full_name, bio, img, email, date_modified: new Date()}

      const numOfValues = Object.values(userToUpdate).filter(Boolean).length
      if(numOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'Full_name', 'bio', 'email' or 'img'`
          }
        })

        if (email) {
          const emailError = UsersService.validateEmail(email)
      
          if(emailError) {
            return res.status(400).json({error: emailError})
          }
        }

      UsersService.updateUser(
        req.app.get('db'),
        req.params.user_id,
        userToUpdate
      )
        .then(user => {
          res.status(200).json(UsersService.serializeUser(user))
        })
        .catch(err => {
          next(err)
        })
    })
    .delete(requireAuth, (req, res, next) => {
      const {user, params, app} = req
      if (parseInt(user.id) !== parseInt(params.user_id))
        return res.status(401).json({
          error: 'Unauthorized request'
        })

      UsersService.deleteUser(
        app.get('db'),
        params.user_id
      )
        .then(() => {
          res.status(204).end()
        })
        .catch(err => next(err))
    })

usersRouter
  .route('/:user_id/posts')
  .get((req, res, next) => {
    UsersService.getUserPosts(
      req.app.get('db'),
      req.params.user_id
    )
      .then(posts => {
        res.json(posts.map(UsersService.serializePost))
      })
      .catch(err => {
        next(err)
      })
  })

async function checkUserExists(req, res, next) {
  try {
    const user = await UsersService.getUserByid(
      req.app.get('db'),
      req.params.user_id
    )

    if (!user)
      return res.status(404).json({
        error: 'User does not exist'
      })
    
    res.user = user
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = usersRouter