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

  describe(`GET /api/posts`, () => {
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

      it('responds with 200 and all of the published posts', () => {
        const publishedPosts = testPosts.filter(p => p.published === true)
        const expectedPost = publishedPosts.map(post => 
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

  describe('POST /api/posts', () => {
   context('happy path', () => {
      beforeEach('insert data', () => 
        helpers.seedBlogTables(
          db,
          testUsers,
          testPosts,
          testComments
        )
      )

      it('responds 201, serialized post', () => {
        const testUsr = testUsers[2]
        const newPost = {
          title: 'New test post',
          content: 'THis is the text content of the new test post, Lets hope this works....',
          img: 'https://picsum.photos/300/200'
        }  
        
        return supertest(app)
          .post('/api/posts')
          .set('Authorization', helpers.makeAuthHeader(testUsr))
          .send(newPost)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('user')
            expect(res.body.title).to.eql(newPost.title)
            expect(res.body.content).to.eql(newPost.content)
            expect(res.body.img).to.eql(newPost.img)
            expect(res.body.user.id).to.eql(testUsr.id)
            expect(res.body.user.bio).to.eql(testUsr.bio)
            expect(res.body.user.img).to.eql(testUsr.img)
            expect(res.body.user.username).to.eql(testUsr.username)
            expect(res.headers.location).to.eql(`/api/posts/${res.body.id}`)
            const expectedDate = new Date().toLocaleString('en', {timeZone: 'UTC'})
            const actualDate = new Date(res.body.date_created).toLocaleString()
            expect(actualDate).to.eql(expectedDate)
          })
      })
    })
  })
  
  describe('GET /api/posts/:post_id', () => {
    context(`Given no post`, () => {
      it(`responds with 404`, () => {
        return supertest(app)
          .get('/api/posts/123456')
          .expect(404, {error: 'Post does not exist'})
      })
    })

    context('Given post', () => {
      beforeEach( 'seed tables', () =>
        helpers.seedBlogTables(
          db,
          testUsers,
          testPosts,
          testComments
        )
      )

      it('Responds with 200 and the expected Post', () => {
        const testPost = testPosts[0]
        const expectedPost = helpers.makeExpectedPost(testUsers, testPost, testComments)

        return supertest(app)
          .get(`/api/posts/${testPost.id}`)
          .expect(200, expectedPost)
      })
    })
  })

  describe('DELETE /api/posts/:post_id', () => {
    context('given no posts', () => {
      it('responds with 404', () => {
        return supertest(app)
          .delete('/api/posts/123456')
          .expect(404 ,{error: 'Post does not exist'})
      })
    })

    context('given posts', () => {
      beforeEach('insert data', () => 
        helpers.seedBlogTables(
          db,
          testUsers,
          testPosts,
          testComments
        )
      )

      it('responds with 204 and removes the post from the database', () => {
        const postId = 2
        const post = testPosts.find(p => p.id === postId)
        const expectedPosts = testPosts.filter(p => p.id !== postId && p.published === true).map(p => helpers.makeExpectedPost(testUsers, p, testComments))
        const user = testUsers.find(u => u.id === post.user_id)

        return supertest(app)
          .delete(`/api/posts/${postId}`)
          .set('Authorization', helpers.makeAuthHeader(user))
          .expect(204)
            .then(res => 
              supertest(app)
                .get(`/api/posts`)
                .expect(expectedPosts)
            )
      })
    })
  })

  describe('PATCH /api/posts/:post_id', () => {
    context('Given no posts', () => {
      it('responds 404', () => {
        return supertest(app)
          .patch('/api/posts/123456')
          .expect(404, {error: 'Post does not exist'})
      })
    })

    context('given post', () => {
      beforeEach('insert data', () => 
        helpers.seedBlogTables(
          db,
          testUsers,
          testPosts,
          testComments
        )
      )

      it('responds 204 and updates the post', () => {
        const postId = 2
        const post = testPosts.find(p => p.id === postId)
        const user = testUsers.find(u => u.id === post.user_id)
        const updatePost = {
          title: 'updated title',
          content: 'updated content',
          img: 'updated img',
          date_modified: '2020-06-08T05:25:16.626Z'
        }

        return supertest(app)
          .patch(`/api/posts/${postId}`)
          .set('Authorization', helpers.makeAuthHeader(user))
          .send(updatePost)
          .expect(204)
          .then(res => 
            supertest(app)
              .get(`/api/posts/${postId}`)
              .expect(res => {
                const {body} = res
                expect(body.id).to.eql(post.id)
                expect(body.title).to.eql(updatePost.title)
                expect(body.content).to.eql(updatePost.content)
                expect(body.img).to.eql(updatePost.img)
                expect(body.date_modified).to.eql(updatePost.date_modified)
              })
          )
      })
    })
  })

  describe('GET /api/posts/drafts', () => {
    context('given no posts', () => {
      beforeEach('seed users', () => 
        helpers.seedUsers(
          db,
          testUsers
        )
      )
      it('responds 200 and an empty list', () => {
        const testUser = testUsers[0]
        return supertest(app)
          .get('/api/posts/drafts')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200, [])
      })
    })

    context('given posts', () => {
      beforeEach('seed database', () => 
        helpers.seedBlogTables(
          db,
          testUsers,
          testPosts,
          testComments
        )
      )

      it('responds with 200 and all of the users drafts', () => {
        const testUser = testUsers[1]
        const usersDrafts = testPosts.filter(p => p.published === false && p.user_id === testUser.id)
        const expectedPosts = usersDrafts.map(p => helpers.makeExpectedPost(testUsers, p, testComments))

        return supertest(app)
          .get('/api/posts/drafts')
          .set('Authorization', helpers.makeAuthHeader(testUser))
          .expect(200, expectedPosts)
      })
    })
  })
})