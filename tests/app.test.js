const request = require('supertest');
const app = require('./../src/app.js');

describe('Test the root path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello\n');
      done();
    });
  });
});

describe('Test the world path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/world').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello world\n');
      done();
    });
  });
});

describe('Test the world path', () => {
  test('It should response the GET method', (done) => {
    request(app).get('/vodafone').then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('Hello Vodafone\n');
      done();
    });
  });
});

