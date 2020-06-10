const express = require('express')
const path = require('path')
const UsersService = require('./users-service')
const {requireAuth} = require('../middleware/jwt-auth')

const usersRouter = express.Router()
const jsonBodyParser = express.json()

usersRouter
  .route('/')
  .post(jsonBodyParser, (req, res, next) => {
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
              img: 'https://blogium.s3.us-west-2.amazonaws.com/default.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCID2eLACw9CjIKM7xmg1GUx9ncaAXbXfFhdOrXu%2FNNVrxAiAQVIaGscAHysZU1qZ%2ByqlVpA5STGmJUU7JsHYSHu20Eir4AQg2EAAaDDc5OTU3MzY5MDU5NCIMEjLiD%2BOtRmhfC%2BNkKtUBk%2F9il%2BeypK%2FM1ZPhEruSqukD05P14YWVCfsFx1CT45giqTh7P9VxQv3r5Ku4ckMPRXDIFPmKs0JPICzue9BRuTP9PeAEbZRLRXrss%2BvqTlaAKuCJm1dM27GeEYG7%2BYlPLV8Vul4BhHvTKHTGZVMZSFGqgpy4t%2B6GXrSGMVf9%2Bb6xMu%2BiPV6HKkH105NHsL90z3HihUlv8BpTgmGe%2FIRwQu8c7XHCvqsbk%2BymKIAMgvBZ1pHNSa2ZH9IiGhCrq4BKuEiMFpUlJCoqxtQ8WKR4y%2FxKpSeNMKqVhfcFOvcCG4d4p81G1mfTyEjUflRO0W4TobaOz%2BXIjfzFcM2yO4449BlsSuZEItbNzOmFQQhXqvQhT3a8EGdkwlnqHIcRFO2rOunDwVvdsHuwSfbbIz63PLBDN1%2FE7E9rNF64CHDqqMc8e3UJREHabHD1TLrNu1iE%2FMchJIyKG472a8Fq%2F%2By3XhZukbxCzEpBS8v3qMOnRBfxSGDSs9Z1mw%2BGGRGPYgk9ch%2FP2ksYWUdIoUch5JCIF7PlwvPvn4J47EayN%2BuppaGWSEUU%2FEwb8vSuDu3XfvdcwGGH%2BerWDjwrszzj%2BRD1%2BEE%2BerSQ8uq4Hx7BR1RdqPKZjdh1J%2Bj91uCAoYVQjVE%2BgPmaxllXhosphP7i27%2FX5U50zzRjXpr9msDJcnZg8Y4sT85lD7bLxCACfFlPqSrTI2vtZRck0xgMK9p1lURss31TE5skrv%2FBCpJ6HMtJItEjTNFD%2BgP1urXfrstcxG4yhUoRb3ypPVN%2FPJoxKFPYLp1LHS4A&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200610T220103Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA3UKSOJDRIWJ5BYJL%2F20200610%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Signature=38d89871833cea3dbeef077ba2529f80c3fb424a1b05eafd33d1a9f3c881741b',
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
      const {username, full_name, bio, img, email, date_modified} = req.body
      const userToUpdate = {username, full_name, bio, img, email, date_modified: new Date()}

      const numOfValues = Object.values(userToUpdate).filter(Boolean).length
      if(numOfValues === 0)
        return res.status(400).json({
          error: {
            message: `Request body must contain either 'Full_name', 'username', 'bio', 'email' or 'img'`
          }
        })

      UsersService.updateUser(
        req.app.get('db'),
        req.params.user_id,
        userToUpdate
      )
        .then(() => {
          res.status(204).end()
        })
        .catch(err => next(err))
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