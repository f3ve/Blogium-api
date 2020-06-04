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