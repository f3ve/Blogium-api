process.env.TZ = 'UTC';
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_EXPIRY = '3s';

require('dotenv').config();

process.env.TEST_DATBASE_URL =
  process.env.TEST_DATABASE_URL ||
  'postgresql://blogium@localhost/blogium_test';

const { expect } = require('chai');
const supertest = require('supertest');

global.expect = expect;
global.supertest = supertest;
