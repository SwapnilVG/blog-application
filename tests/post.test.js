import * as chai from 'chai'; 
import chaiHttp from 'chai-http';
import app from '../server.js'; // Import server file


chai.use(chaiHttp);
const { expect } = chai;

describe('Posts', () => {
    let token = '';
    let postId = '';

    before((done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    it('should create a new post', (done) => {
        chai.request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Test Post',
                content: 'This is a test post.',
                author_id: '60d1c2c4b5f5f4d0f9e4d1c4' // Example author ID, replace with actual ID
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('title').eql('Test Post');
                postId = res.body._id; // Save post ID for later use
                done();
            });
    });

    it('should get all posts', (done) => {
        chai.request(app)
            .get('/api/posts')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should get a post by ID', (done) => {
        chai.request(app)
            .get(`/api/posts/${postId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title').eql('Test Post');
                done();
            });
    });

    it('should update a post', (done) => {
        chai.request(app)
            .put(`/api/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Updated Test Post'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('title').eql('Updated Test Post');
                done();
            });
    });

    it('should delete a post', (done) => {
        chai.request(app)
            .delete(`/api/posts/${postId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Post deleted');
                done();
            });
    });
});
