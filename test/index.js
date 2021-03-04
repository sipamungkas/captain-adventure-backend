/* eslint-disable no-unused-expressions */
const chai = require('chai');
const {expect} = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
let token;

describe('API Test for users resources', () => {
  it('should GET /', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.not.empty;
        done();
      });
  });
  it('should POST /v1/users/session', (done) => {
    chai
      .request(app)
      .post('/v1/users/session')
      .send({email: 'admin@captain-adventure.com', password: 'Password@1902'})
      .end((err, res) => {
        token = res.body.data.token;
        expect(err).to.be.null;
        expect(res).to.be.not.empty;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('meta');
        expect(res.body.meta).to.have.all.keys('message', 'code', 'status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.all.keys(
          'id',
          'name',
          'email',
          'token',
          'avatar',
        );
        done();
      });
  });
});

describe('API Test for categories resources', () => {
  it('Should get categories list', (done) => {
    chai
      .request(app)
      .get('/v1/categories')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.empty;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.meta).to.have.all.keys('message', 'code', 'status');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('should create new category, update category, delete category', (done) => {
    chai
      .request(app)
      .post('/v1/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Category test',
      })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.be.not.empty;
        expect(res).to.have.status(201);
        done();
      });
  });
});
