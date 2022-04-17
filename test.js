const supertest = require('supertest');
const server = require('./index');
const chai = require('chai');

chai.should();

const api = supertest.agent(server);

describe('Test Server Method', () => {
  it('should connect to the Server', (done) => {
    api.get('/')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .end((err, res) => {
        res.status.should.equal(200);
        done();
      });
  });
})