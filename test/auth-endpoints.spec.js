const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');

describe('Auth Enpoints', () => {
  let db;

  const { testUsers } = helpers.makeBlogFixtures();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe(`POST /api/auth/login`, () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    const requiredFields = ['username', 'password'];

    requiredFields.forEach((field) => {
      const loginAttemptBody = {
        username: testUser.username,
        password: testUser.password,
      };

      it(`responds with 400 and required error when ${field} is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post('/api/auth/login')
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });

    it(`responds with 400 and 'invalid username or password' when bad username`, () => {
      const badUsername = { username: 'wrong', password: testUser.password };
      return supertest(app)
        .post('/api/auth/login')
        .send(badUsername)
        .expect(400, { error: 'Incorrect Username or password' });
    });

    it(`responds with 400 'Invalid username or password' when bad password`, () => {
      const badPassword = { username: testUser.username, password: 'wrong' };
      return supertest(app)
        .post('/api/auth/login')
        .send(badPassword)
        .expect(400, { error: 'Incorrect Username or password' });
    });

    it('responds 200 and JWT auth token using secret', () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password,
      };

      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200);
    });
  });

  describe(`POST /api/auth/refresh`, () => {
    beforeEach('insert users', () => helpers.seedUsers(db, testUsers));

    it('responds 200 and JWT auth token using secret', () => {
      return supertest(app)
        .post('/api/auth/refresh')
        .set('Authorization', helpers.makeAuthHeader(testUser))
        .expect(200);
    });
  });
});
