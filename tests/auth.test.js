import * as chai from 'chai'; 
import chaiHttp from 'chai-http';
import app from '../server.js'; // Import server file

chai.use(chaiHttp);
const { expect } = chai;
describe('Authentication', () => {
    let token = '';

    it('should register a new user', (done) => {
        chai.request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                email: 'test@example.com',
                password: 'testpassword'
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('message').eql('User registered');
                done();
            });
    });

    it('should log in a user and return a token', (done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('token');
                token = res.body.token; // Save token for later use
                done();
            });
    });
});
