const xss = require('xss')

const CommentsService = {
  getById(db, id) {
    return db
      .from('blogful_comments AS comm')
      .select(
        'comm.id',
        'comm.content',
        'comm.date_created',
        'comm.post_id',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  usr.id,
                  usr.username,
                  usr.img
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .leftJoin(
        'blogful_users AS usr',
        'comm.user_id',
        'usr.id',
      )
      .where('comm.id', id)
      .first()
  },

  insertComment(db, newComment) {
    return db
      .insert(newComment)
      .into('blogful_comments')
      .returning('*')
      .then(([comment]) => comment)
      .then(comment =>
        CommentsService.getById(db, comment.id)
      )
  },

  deleteComment(db, id) {
    return db
      .from('posts')
      .where('id', id)
      .delete()
  },

  serializeComment(comment) {
    const { user } = comment
    return {
      id: comment.id,
      content: xss(comment.content),
      post_id: comment.post_id,
      date_created: new Date(comment.date_created),
      user: {
        id: user.id,
        username: user.username,
        img: user.img
      },
    }
  }
}

module.exports = CommentsService