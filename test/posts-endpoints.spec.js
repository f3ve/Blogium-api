const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')

describe('Posts Endpoints', () => {
  let db

  const {
    testUsers,
    testPosts,
    testComments
  } = helpers.makeBlogFixtures()
  
  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db' , () => db.destroy())
  
  before('cleanup', () => helpers.cleanTables(db))

  afterEach('cleanup', () => helpers.cleanTables(db))

  describe.only(`GET /api/posts`, () => {
    context(`Given no posts`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get('/api/posts')
          .expect(200, [])
      })
    })

    context('Given posts', () => {
      beforeEach('insert data', () => 
        helpers.seedBlogTables(
          db,
          testUsers,
          testPosts,
          testComments
        )
      )

      it('responds with 200 and all of the posts', () => {
        const expectedPost = testPosts.map(post => 
          helpers.makeExpectedPost(
            testUsers,
            post,
            testComments
          )  
        )
        return supertest(app)
          .get('/api/posts')
          .expect(200, expectedPost)
      })
    })
  })

  context('Given an xss attack', () => {
    const testUser = testUsers[0]
    const {
      maliciousPost,
      expectedPost
    } = helpers.makeMaliciousPost(testUser)
    
    beforeEach('insert malicious content', () => {
      return helpers.seedMaliciousData(
        db,
        testUser,
        maliciousPost  
      )
    })

    it('removes XSS attack content', () => {
      return supertest(app)
        .get(`/api/posts`)
        .expect(200)
        .expect(res => {
          expect(res.body[0].title).to.eql(expectedPost.title)
          expect(res.body[0].content).to.eql(expectedPost.content)
          expect(res.body[0].img).to.eql
        })
    })
  })
})