const expect = require('chai').expect;
const config = require('app/config');
const FormatUrl = require('app/utils/FormatUrl');
const request = require('supertest');

const VALIDATION_SERVICE_URL = config.services.validation.url;

/* eslint no-console: 0 no-unused-vars: 0 */
describe.only('Pin Creation API Tests', function() {

    const pinServiceUrl = FormatUrl.format(VALIDATION_SERVICE_URL, '/pin');

    describe('1. Invalid number which should produce a 400 Bad Request', function () {
        it('Returns HTTP 400 status', function (done) {
            request(pinServiceUrl)
                .get('')
                .query({phoneNumber: '+$447701111111'})
                .set('Session-Id', '012233456789')
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        console.log('error raised: ', err);
                    }
                    expect(err).to.be.equal(null);
                    expect(res.text).to.equal('');
                    done();
                });
        });
    });

    describe('2. Missing Session-Id which should produce a 400 Bad Request', function () {
        it('Returns HTTP 400 status', function (done) {
            request(pinServiceUrl)
                .get('')
                .query({phoneNumber: '+447701111111'})
                .expect(400)
                .end(function (err, res) {
                    if (err) {
                        console.log('error raised: ', err);
                    }
                    expect(err).to.be.equal(null);
                    done();
                });
        });
    });

    describe('3. Valid International Number', function () {
        it('Returns HTTP 200 status and pin number', function (done) {
            request(pinServiceUrl)
                .get('')
                .query({phoneNumber: '+61437112945'})
                .set('Session-Id', '012233456789')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log('error raised: ', err);
                    }
                    expect(err).to.be.equal(null);
                    expect(res.header).to.have.property('content-length').eq('6');
                    expect(res.text).is.not.equal(null);
                    done();
                });
        });
    });

    describe('4. Valid UK Number', function () {
        it('Returns HTTP 200 status and pin number', function (done) {
            request(pinServiceUrl)
                .get('')
                .query({phoneNumber: '+447535538319'})
                .set('Session-Id', '012233456789')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log('error raised: ', err);
                    }
                    expect(err).to.be.equal(null);
                    expect(res.header).to.have.property('content-length').eq('6');
                    expect(res.text).is.not.equal(null);
                    done();
                });
        });
    });

    describe('5. Valid UK Local Number', function () {
        it('Returns HTTP 200 status and pin number', function (done) {
            request(pinServiceUrl)
                .get('')
                .query({phoneNumber: '07535538319'})
                .set('Session-Id', '012233456789')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        console.log('error raised: ', err);
                    }
                    expect(err).to.be.equal(null);
                    expect(res.header).to.have.property('content-length').eq('6');
                    expect(res.text).is.not.equal(null);
                    done();
                });
        });
    });
});
