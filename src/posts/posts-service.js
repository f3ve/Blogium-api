const xss = require('xss')

const PostsService = {
  _getAllPosts(db) {
    return db
      .from('posts AS p')
      .select(
        'p.id',
        'p.title',
        'p.img',
        'p.date_created',
        'p.date_modified',
        'p.content',
        'p.published',
        'p.user_id',
        db.raw(
          `count(DISTINCT comm) AS number_of_comments`
        ),
        db.raw(
          `json_strip_nulls(
            json_build_object(
              'id', users.id,
              'username', users.username,
              'img', users.img,
              'bio', users.bio
            )
          ) AS "user"`
        ),
      )
      .leftJoin(
        'comments AS comm',
        'p.id',
        'comm.post_id'
      )
      .leftJoin(
        'users',
        'p.user_id',
        'users.id'
      )
      .groupBy('p.id', 'users.id')
  },

  insertPost(db, newPost) {
    return db
      .insert(newPost)
      .into('posts')
      .returning('*')
      .then(([post]) => PostsService.getById(db, post.id))
  },

  getPublished(db) {
    return PostsService._getAllPosts(db)
      .where('p.published', true)
  },

  getUserPublishedPosts(db, userId) {
    return PostsService._getAllPosts(db)
      .where('p.user_id', userId)
  },

  getUnpublished(db, userId) {
    return PostsService._getAllPosts(db)
    .where('p.published', false)
    .where('p.user_id', userId)
  },

  getById(db, id) {
    return PostsService._getAllPosts(db)
      .where('p.id', id)
      .first()
  },

  deletePost(db, id) {
    return db
      .from('posts')
      .where('id', id)
      .delete()
  },

  updatePost(db, id, newPostFields) {
    return db
      .from('posts')
      .where('id', id)
      .update(newPostFields)
  },

  getPostComments(db, post_id) {
    return db
      .from('comments AS comm')
      .select(
        'comm.id',
        'comm.content',
        'comm.date_created',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  users.id,
                  users.username,
                  users.img
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('comm.post_id', post_id)
      .leftJoin(
        'users',
        'comm.user_id',
        'users.id'
      )
      .groupBy('comm.id', 'users.id')
  },

  serializePost(post) {
    const {user} = post
    return {
      id: post.id,
      title: xss(post.title),
      content: xss(post.content),
      img: xss(post.img),
      date_created: new Date(post.date_created),
      date_modified: new Date(post.date_modified) || null,
      number_of_comments: Number(post.number_of_comments) || 0,
      published: post.published,
      user: {
        id: user.id,
        username: xss(user.username),
        img: xss(user.img),
        bio: xss(user.bio)
      }
    }
  },

  serializeComment(com) {
    const {user} = com 
    return {
      id: com.id,
      post_id: com.post_id,
      content: xss(com.content),
      date_created: com.date_created,
      user: {
        id: user.id,
        username: xss(user.username),
        img: xss(user.img)
      }
    }
  }
}

module.exports = PostsService