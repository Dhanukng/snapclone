import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import app from '../src/app.js';

test('GET /api/health returns success status', async () => {
  const response = await request(app).get('/api/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.equal(response.body.message, 'SnapClone API is healthy');
});

test('POST /api/auth/signup rejects incomplete payload', async () => {
  const response = await request(app).post('/api/auth/signup').send({
    fullName: 'Test User',
    email: 'test@example.com'
  });

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.match(response.body.message, /required/i);
});

test('POST /api/auth/login rejects missing credentials', async () => {
  const response = await request(app).post('/api/auth/login').send({});

  assert.equal(response.status, 400);
  assert.equal(response.body.success, false);
  assert.match(response.body.message, /required/i);
});
