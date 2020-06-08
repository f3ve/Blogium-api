const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

function makeUsersArray() {
  return [
    {
      id: 1,
      username: 'test-user-1',
      full_name: 'Test User 1',
      bio: 'This is the bio of Test User 1',
      img: 'https://picsum.photos/200',
      password: 'password',
      email: 'testemail1@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 2,
      username: 'test-user-2',
      full_name: 'Test User 2',
      bio: 'This is the bio of Test User 2',
      img: 'https://picsum.photos/200',
      password: 'password',
      email: 'testemail2@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    },
    {
      id: 3,
      username: 'test-user-3',
      full_name: 'Test User 3',
      bio: 'This is the bio of Test User 3',
      password: 'password',
      img: 'https://picsum.photos/200',
      email: 'testemail3@email.com',
      date_created: '2029-01-22T16:28:32.615Z',
      date_modified: '2029-01-22T16:28:32.615Z'
    }
  ]
}

function makeBlogFixtures() {
  const testUsers = makeUsersArray()
  return {testUsers}
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ id: user.id}, secret, {
    subject: user.username,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

function makeExpectedUser(user) {
  return {
    id: user.id,
    username: user.username,
    full_name: user.full_name,
    img: user.img,
    bio: user.bio,
    email: user.email,
    date_created: user.date_created,
    date_modified: user.date_modified
  }
}

function seedUsers(db, usrs) {
  const bcryptedUsers = usrs.map(u => ({
    ...u,
    password: bcrypt.hashSync(u.password, 12)
  }))
  return db.into('users').insert(bcryptedUsers)
    .then(() => 
      db.raw(
        `SELECT setval('users_id_seq', ?)`,
        [usrs[usrs.length - 1].id]
      )
    )
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      comments,
      posts,
      users
        RESTART IDENTITY CASCADE
    `
  )
}

module.exports = {
  makeUsersArray,
  makeBlogFixtures,
  seedUsers,
  makeAuthHeader,
  cleanTables,
  makeExpectedUser,
}