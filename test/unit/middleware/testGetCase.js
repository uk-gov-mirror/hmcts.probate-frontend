'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');
const getCase = rewire('app/middleware/getCase');
const content = require('app/resources/en/translation/dashboard');
const Service = require('app/services/Service');

describe('GetCaseMiddleware', () => {
    it('should return a case in progress and redirect to task-list', (done) => {
        const req = {
            originalUrl: '/get-case/1234-5678-9012-3456',
            session: {
                id: 'fb2e77d.47a0479900504cb3ab4a1f626d174d2d',
                form: {
                    applicantEmail: 'test@email.com'
                }
            }
        };

        const multipleAppGetCaseStubResponse = {
            form: {'applicantEmail': 'test@email.com'},
            status: content.statusInProgress
        };

        const res = {redirect: () => {
            // Do nothing
        }};
        const redirectSpy = sinon.spy(res, 'redirect');

        const serviceStub = sinon.stub(Service.prototype, 'fetchJson')
            .returns(Promise.resolve(multipleAppGetCaseStubResponse));

        getCase(req, res);

        setTimeout(() => {
            expect(serviceStub.calledOnce).to.equal(true);
            expect(redirectSpy.calledOnce).to.equal(true);
            expect(redirectSpy.calledWith('/task-list')).to.equal(true);

            serviceStub.restore();
            redirectSpy.restore();

            done();
        });
    });

    it('should return a submitted case in progress and redirect to thank-you', (done) => {
        const req = {
            originalUrl: '/get-case/9012-3456-7890-1234',
            session: {
                id: 'fb2e77d.47a0479900504cb3ab4a1f626d174d2d',
                form: {
                    applicantEmail: 'test@email.com'
                }
            }
        };

        const multipleAppGetCaseStubResponse = {
            form: {'applicantEmail': 'test@email.com'},
            status: content.statusSubmitted
        };

        const res = {redirect: () => {
            // Do nothing
        }};
        const redirectSpy = sinon.spy(res, 'redirect');

        const serviceStub = sinon.stub(Service.prototype, 'fetchJson')
            .returns(Promise.resolve(multipleAppGetCaseStubResponse));

        getCase(req, res);

        setTimeout(() => {
            expect(serviceStub.calledOnce).to.equal(true);
            expect(redirectSpy.calledOnce).to.equal(true);
            expect(redirectSpy.calledWith('/thank-you')).to.equal(true);

            serviceStub.restore();
            redirectSpy.restore();

            done();
        });
    });

    it('should return an error if the case is unable to be retrieved', (done) => {

        const req = {
            originalUrl: '/get-case/9012-3456-7890-1234',
            session: {
                id: 'fb2e77d.47a0479900504cb3ab4a1f626d174d2d',
                form: {
                    applicantEmail: 'test@email.com'
                }
            }
        };

        const res = {redirect: () => {
            // Do nothing
        }};
        const redirectSpy = sinon.spy(res, 'redirect');

        const serviceStub = sinon.stub(Service.prototype, 'fetchJson')
            .returns(Promise.reject(new Error('Unable to retrieve case')));

        getCase(req, res);

        setTimeout(() => {
            expect(serviceStub.calledOnce).to.equal(true);
            expect(redirectSpy.calledOnce).to.equal(false);

            serviceStub.restore();
            redirectSpy.restore();

            done();
        });
    });
});
