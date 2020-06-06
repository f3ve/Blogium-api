const knex = require('knex')
const bcrypt = require('bcryptjs')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Users Endpoints', () => {
  let db

  const { testUsers } = helpers.makeBlogFixtures()
  const testUser = testUsers[0]

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnent from db', () => db.destroy())

  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe(`POST /api/users/`, () => {
    context(`User Validation`, () => {
      beforeEach('insert users', () => 
        helpers.seedUsers(
          db,
          testUsers,
        )
      )
      
      const requiredFields = ['username', 'password', 'full_name', 'email',]

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          username: 'test username',
          password: 'testPassword',
          full_name: 'test full_name',
          email: 'testemail@email.com',
          matchPassword: 'testPassword',
        }

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field]

          return supertest(app)
            .post('/api/users')
            .send(registerAttemptBody)
            .expect(400, {
              error: `Missing '${field}' in request body`,
            })
        })
      })
    
      it(`responds 400 'Password must be longer than 8 characters' when empty password`, () => {
        const userShortPassword = {
          username: 'test user_name',
          password: '1234567',
          matchPassword: '1234567',
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(userShortPassword)
          .expect(400, {error: `Password must be at least 8 characters`})
      })

      it(`responds 400 'Password must be less than 72 characters' when long password`, () => {
        const userLongPassword = {
          username: 'test user_name',
          password: '*'.repeat(73),
          matchPassword: '*'.repeat(73),
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        
        return supertest(app)
          .post('/api/users')
          .send(userLongPassword)
          .expect(400, { error: `Password must be less than 72 characters`})
      })

      it(`responds with 400 error when password starts with spaces`, () => {
        const userPasswordStartsSpaces = {
          username: 'test user_name',
          password: ' 1Aa!2b@',
          matchPassword: ' 1Aa!2b@', 
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, {error: `Password must not start or end with empty spaces`})
      })

      it(`responds with 400 error when password ends with spaces`, () => {
        const userPasswordStartsSpaces = {
          username: 'test user_name',
          password: '1Aa!2b@ ',
          matchPassword: '1Aa!2b@ ',
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordStartsSpaces)
          .expect(400, {error: `Password must not start or end with empty spaces`})
      })

      it(`responds with 400 error when password isn't complex enough`, () => {
        const userPasswordNotComplex = {
          username: 'test user_name',
          password: '11AAaabb',
          matchPassword: '11AAaabb',
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(userPasswordNotComplex)
          .expect(400, { error: `Password must contain 1 upper case, lower case, number, and special character`})
      })

      it(`respnds 400 'User name already taken' when user_name isn't unique`, () => {
        const duplicateUser = {
          username: testUser.username,
          password: '11AAaa!!',
          full_name: 'test full_name',
          email: 'testemail@email.com',
          matchPassword: '11AAaa!!',
        }
        return supertest(app)
          .post('/api/users')
          .send(duplicateUser)
          .expect(400, { error: `Username already taken` })
      })

      it(`Responds 400 'Username must be at least 4 characters' when username not long enough`, () => {
        const shortUsername = {
          username: 'yee',
          password: '11AAaabb!',
          matchPassword: '11AAaabb!',
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(shortUsername)
          .expect(400, {error: `Username must be at least 4 characters`})
      })

      it(`Responds with 400 'Username cannot start or end with empty space' when username starts with a space`, () => {
        const startsWithSpace = {
          username: ' testUsername',
          password: '11AAaabb!',
          matchPassword: '11AAaabb!',
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(startsWithSpace)
          .expect(400, { error: `Username cannot start or end with empty space`})
      })

      it(`Responds with 400 'Username cannot start or end with empty space' when username ends with a space`, () => {
        const endsWithSpace = {
          username: 'testUsername ',
          password: '11AAaabb!',
          matchPassword: '11AAaabb!',
          full_name: 'test full_name',
          email: 'testemail@email.com'
        }
        return supertest(app)
          .post('/api/users')
          .send(endsWithSpace)
          .expect(400, { error: `Username cannot start or end with empty space`})
      })     
      
      it(`Responds 400 'You must enter a valid email', when given invalid email`, () => {
        const invalidEmail = {
          username: 'testUsername',
          password: '11AAaabb!',
          matchPassword: '11AAaabb!',
          full_name: 'test full_name',
          email: 'a@e'
        }
        return supertest(app)
          .post('/api/users')
          .send(invalidEmail)
          .expect(400, {error: 'You must enter a valid email'})
      })
    })

    context('happy path', () => {
      it(`responds 201, serialized user, storing bcrypted password`, () => {
        const newUser = {
          username: 'test-username',
          password: '11AAaa!!',
          full_name: 'Full Name',
          email: 'testemail@email.com',
          bio: 'this is a new test user bio!',
          matchPassword: '11AAaa!!',
          img: 'this is a picture'
        }
        return supertest(app)
          .post('/api/users')
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body.username).to.eql(newUser.username)
            expect(res.body.full_name).to.eql(newUser.full_name)
            expect(res.body.bio).to.eql(newUser.bio)
            expect(res.body.email).to.eql(newUser.email)
            expect(res.body).to.not.have.property('password')
            expect(res.body).to.not.have.property('matchPassword')
            expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
            const expectedDate = new Date().toLocaleString('en', { timeZoine: 'UTC'})
            const actualDate = new Date(res.body.date_created).toLocaleString()
            expect(actualDate).to.eql(expectedDate)
          })
          .expect(res => 
            db
            .from('users')
            .select('*')
            .where({id: res.body.id})
            .first()
            .then(row => {
              expect(row.username).to.eql(newUser.username)
              expect(row.full_name).to.eql(newUser.full_name)
              const expectedDate = new Date().toLocaleString('en', { timeZone: 'UTC'})
              const actualDate = new Date(res.body.date_created).toLocaleString
              expect(actualDate).to.eql(expectedDate)
              
              return bcrypt.compare(newUser.password, res.password)
            })
            .then(match => {
              expect(match).to.be.true
            })
          )
      })
    })
  })
})