const {expect} = require('chai');
const app = require('app');
const request = require('supertest');
const config = require('app/config');
const healthcheck = require('app/healthcheck');

describe('healthcheck.js', () => {
    describe('getServiceHealthUrl()', () => {
        describe('should return the correct url', () => {
            it('when given a service url with a port', (done) => {
                const serviceUrl = healthcheck.getServiceHealthUrl('http://localhost:8080/validate');
                expect(serviceUrl).to.equal(`http://localhost:8080${config.healthEndpoint}`);
                done();
            });

            it('when given a service url without a port', (done) => {
                const serviceUrl = healthcheck.getServiceHealthUrl('http://localhost/validate');
                expect(serviceUrl).to.equal(`http://localhost${config.healthEndpoint}`);
                done();
            });
        });
    });

    describe('/health endpoint', () => {
        it('should return the correct params', (done) => {
            const server = app.init();
            const agent = request.agent(server.app);
            agent.get('/health')
            .expect(200)
            .end((err, res) => {
                server.http.close();
                if (err) {
                    throw err;
                }
                expect(res.body).to.have.property('name').and.equal(config.service.name);
                expect(res.body).to.have.property('status').and.equal('UP');
                expect(res.body).to.have.property('host').and.equal(healthcheck.osHostname);
                expect(res.body).to.have.property('gitCommitId').and.equal(healthcheck.gitCommitId);
                done();
            });
        });
    });
});
