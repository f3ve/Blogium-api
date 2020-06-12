const bcrypt = require('bcryptjs')
const xss = require('xss')

const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])[\S]+/

const UsersService = {
  hasUserWithUsername(db, username) {
    return db('users')
      .where({ username })
      .first()
      .then(user => !!user)
  },

  insertUser(db, newUser) {
    return db
      .insert(newUser)
      .into('users')
      .returning('*')
      .then(([user]) => user)
  },

  getAllUsers(db) {
    return db
      .from('users')
      .select('*')
  },

  getUserByid(db, id) {
    return UsersService.getAllUsers(db)
      .where('id', id)
      .first()
  },

  updateUser(db, id, newUserFields) {
    return db
      .from('users')
      .where('id', id)
      .update(newUserFields)
      .returning('*')
      .then(([user]) => user)
  },

  deleteUser(db, id) {
    return db
      .from('users')
      .where('id', id)
      .delete()
  },

  validateUsername(username) {
    if (username.length < 4) {
      return 'Username must be at least 4 characters'
    }
    if (username.startsWith(' ') || username.endsWith(' ')) {
      return `Username cannot start or end with empty space`
    }
  },

  validateEmail(email) {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return 'You must enter a valid email'
    }
  },


  validatePassword(password, matchPassword) {
    if (password.length < 8) {
      return 'Password must be at least 8 characters'
    }
    if (password.length > 72) {
      return 'Password must be less than 72 characters'
    }
    if (password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces'
    }
    if (!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
      return 'Password must contain 1 upper case, lower case, number, and special character'
    }
    if (password !== matchPassword) {
      return `Passwords don't match`
    }
    return null
  },

  hashPassword(password) {
		return bcrypt.hash(password, 12)
  },

  getUserPosts(db, userId) {
    return db
      .from('posts AS p')
      .select(
        'p.id',
        'p.title',
        'p.date_created',
        'p.img',
        db.raw(
          `json_strip_nulls(
            row_to_json(
              (SELECT tmp FROM (
                SELECT
                  u.id,
                  u.username
              ) tmp)
            )
          ) AS "user"`
        )
      )
      .where('p.user_id', userId)
      .where('p.published', true)
      .leftJoin(
        'users AS u',
        'p.user_id',
        'u.id'
      )
      .groupBy('p.id', 'u.id')
  },

  serializePost(post) {
    const {user} = post
    return {
      id: post.id,
      content: xss(post.content),
      title: xss(post.title),
      date_created: post.date_created,
      img: xss(post.img),
      user: {
        id: user.id,
        username: xss(user.username)
      }
    }
  },

  serializeUser(user) {
    return {
      id: user.id,
      full_name: xss(user.full_name),
      username: xss(user.username),
      img: xss(user.img),
      bio: xss(user.bio),
      email: xss(user.email),
      date_created: new Date(user.date_created),
      date_modified: new Date(user.date_modified),
    }
  },
}

module.exports = UsersService