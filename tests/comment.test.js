import * as chai from 'chai'; 
import chaiHttp from 'chai-http';
import app from '../server.js'; // Import server file


chai.use(chaiHttp);
const { expect } = chai;
describe('Comments', () => {
    let token = '';
    let postId = '';
    let commentId = '';

    before((done) => {
        chai.request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            })
            .end((err, res) => {
                token = res.body.token;
                // Create a post to comment on
                chai.request(server)
                    .post('/api/posts')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        title: 'Comment Post',
                        content: 'This post is for commenting.',
                        author_id: '60d1c2c4b5f5f4d0f9e4d1c4' // Example author ID
                    })
                    .end((err, res) => {
                        postId = res.body._id;
                        done();
                    });
            });
    });

    it('should create a new comment', (done) => {
        chai.request(app)
            .post('/api/comments')
            .set('Authorization', `Bearer ${token}`)
            .send({
                post_id: postId,
                content: 'This is a test comment.',
                author_id: '60d1c2c4b5f5f4d0f9e4d1c4' // Example author ID
            })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('content').eql('This is a test comment.');
                commentId = res.body._id;
                done();
            });
    });

    it('should get all comments for a post', (done) => {
        chai.request(app)
            .get(`/api/comments?post_id=${postId}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should update a comment', (done) => {
        chai.request(server)
            .put(`/api/comments/${commentId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                content: 'Updated comment content.'
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('content').eql('Updated comment content.');
                done();
            });
    });

    it('should delete a comment', (done) => {
        chai.request(server)
            .delete(`/api/comments/${commentId}`)
            .set('Authorization', `Bearer ${token}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').eql('Comment deleted');
                done();
            });
    });
});
