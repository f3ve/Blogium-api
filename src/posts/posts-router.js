const express = require('express')
const PostsService = require('./posts-service')
const {requireAuth} = require('../middleware/jwt-auth')

const postsRouter = express.Router()

postsRouter
  .route('/')
  .get((req, res, next) => {
    PostsService._getAllPosts(req.app.get('db'))
      .then(posts => {
        res.json(posts.map(PostsService.serializePost))
      })
      .catch(err => {
        console.log(err)
        next(err)
      })
  })

module.exports = postsRouter