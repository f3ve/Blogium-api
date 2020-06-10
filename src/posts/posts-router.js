const express = require('express')
const PostsService = require('./posts-service')
const path = require('path')
const {requireAuth} = require('../middleware/jwt-auth')

const postsRouter = express.Router()
const jsonBodyParser = express.json()

postsRouter
  .route('/')
  .get((req, res, next) => {
    PostsService.getPublished(req.app.get('db'))
      .then(posts => {
        res.json(posts.map(PostsService.serializePost))
      })
      .catch(err => {
        next(err)
      })
  })
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const {title, content, img,} = req.body

    const newPost = {
      user_id: req.user.id,
      title,
      content,
      img,
      date_created: 'now()'
    }

    PostsService.insertPost(
      req.app.get('db'),
      newPost
    )
      .then(post => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${post.id}`))
          .json(PostsService.serializePost(post))
      })
      .catch(err => {
        next(err)
      })
  })

postsRouter
  .route('/drafts')
  .all(requireAuth)
  .get((req, res, next) => {
    PostsService.getUnpublished(req.app.get('db'), req.user.id)
      .then(posts => {
        res.json(posts.map(PostsService.serializePost))
      })
      .catch(err => {
        next(err)
      })
  })

postsRouter
  .route('/:post_id')
  .all(CheckPostExists)
  .get((req, res) => {
    res.json(PostsService.serializePost(res.post))
  })
  .delete(requireAuth, (req, res, next) => {
    PostsService.deletePost(
      req.app.get('db'),
      req.params.post_id
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(err => next(err))
  })
  .patch(requireAuth, jsonBodyParser, (req, res, next) => {
    const {title, content, img, date_modified, published} = req.body
    const postToUpdate = { title, content, img, date_modified, published}

    PostsService.updatePost(
      req.app.get('db'),
      req.params.post_id,
      postToUpdate
    )
      .then(() => {
        res.status(204).end()
      })
      .catch(err => next(err))
  })

async function CheckPostExists(req, res, next) {
  try {
    const post = await PostsService.getById(
      req.app.get('db'),
      req.params.post_id
    )

    if (!post)
      return res.status(404).json({
        error: 'Post does not exist'
      })
    
    res.post = post
    next()
  } catch(error) {
    next(error)
  }
}

module.exports = postsRouter