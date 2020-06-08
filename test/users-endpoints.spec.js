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

  describe('GET /api/users', () => {
    context('given no users', () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/users')
          .expect(200, [])
      })
    })
    
    context('Given there are users in the database', () => {
      beforeEach('insert users', () => 
        helpers.seedUsers(
          db,
          testUsers
        )
      )

      it(`responds with 200 and all the users builds`, () => {
        const expectedUsers = testUsers.map(user => helpers.makeExpectedUser(user))
        return supertest(app)
          .get('/api/users')
          .expect(200, expectedUsers)
      })
    })
  })

  describe('GET /api/users/:user_id', () => {
    context(`Given No user`, () => {
      it(`responds with 404`, () => {
        return supertest(app)
          .get(`/api/users/123456`)
          .expect(404, {error: 'User does not exist'})
      })
    })

    context(`Given user is in the database`, () => {
      beforeEach('insert users', () => 
        helpers.seedUsers(
          db,
          testUsers
        )
      )

      it('responds with 200 and the expected user', () => {
        const userId = 2
        const expectedUser = testUsers.filter(u => u.id === userId).map(helpers.makeExpectedUser)[0]

        return supertest(app)
          .get(`/api/users/${userId}`)
          .expect(200, expectedUser)
      })
    })
  })

  describe('DELETE /api/users/:user_id', () => {
    context(`given no users`, () => {
      it(`responds with 404`, () => {
        return supertest(app)
          .delete(`/api/users/123456`)
          .expect(404, {error: 'User does not exist'})
      })
    })

    context('Given user exists', () => {
      beforeEach('insert users', () => 
        helpers.seedUsers(
          db, testUsers
        )
      )

      it(`responds with 204 and removes the user from the database`, () => {
        const userId = 3
        const user = testUsers.filter(u => u.id === userId)[0]
        const expectUsers = testUsers.filter(u => u.id !== userId).map(u => helpers.makeExpectedUser(u))
        return supertest(app)
          .delete(`/api/users/${userId}`)
          .set('Authorization', helpers.makeAuthHeader(user))
          .expect(204)
            .then(res => 
              supertest(app)
                .get(`/api/users`)
                .expect(expectUsers)
            )
      })
    })
  })

  describe.only('PATCH', () => {
    context(`given no users`, () => {
      it('responds 404', () => {
        return supertest(app)
          .patch('/api/users/123456')
          .expect(404, {error: 'User does not exist'})
      })
    })

    context('Given the user exists', () => {
      beforeEach('Insert users', () => 
        helpers.seedUsers(
          db,
          testUsers
        )
      )

      it.only('responds 204 and updates the user info', () => {
        const userId = 1
        const user = testUsers.filter(u => u.id === userId)[0]
        const updateUser = {
          full_name: 'Test new full name',
          username: 'test new username',
          bio: 'New test bio for test user 1',
          img: 'new test img',
          email: 'new test email',
          date_modified: '2020-06-08T05:25:16.626Z'
        }

        return supertest(app)
          .patch(`/api/users/${userId}`)
          .set('Authorization', helpers.makeAuthHeader(user))
          .send(updateUser)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/users/${userId}`)
              .expect(res => {
                const {body} = res
                expect(body.id).to.eql(user.id)
                expect(body.email).to.eql(updateUser.email)
                expect(body.full_name).to.eql(updateUser.full_name)
                expect(body.username).to.eql(updateUser.username)
                expect(body.img).to.eql(updateUser.img)
                expect(body.date_modified).to.eql(updateUser.date_modified)
                expect(body.date_created).to.eql(user.date_created)
                expect(body).to.not.have.property('password')
              })
          )
      })
    })
  })
})