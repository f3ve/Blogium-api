const express = require('express')
const PostsService = require('./posts-service')
const {requireAuth} = require('../middleware/jwt-auth')

const postsRouter = express.Router()
const jsonBodyParser = express.json()

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
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {title, content, img,} = req.body

    const newPost = {
      title,
      content,
      img,
      date_created: 'now()'
    }
  })

module.exports = postsRouter