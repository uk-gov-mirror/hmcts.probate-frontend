'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const rewire = require('rewire');
const multipleApplicationsMiddleware = rewire('app/middleware/multipleApplications');
const Service = require('app/services/Service');
const content = require('app/resources/en/translation/dashboard');

const allApplicationsExpectedResponse = [
    {
        deceasedFullName: 'David Cameron',
        dateCreated: '13 July 2016',
        ccdCase: {
            id: '1234-5678-9012-3456',
            state: 'Draft'
        }
    },
    {
        deceasedFullName: 'Theresa May',
        dateCreated: '24 July 2019',
        ccdCase: {
            id: '5678-9012-3456-1234',
            state: 'CaseCreated'
        }
    },
    {
        deceasedFullName: 'Boris Johnson',
        dateCreated: '31 October 2019',
        ccdCase: {
            id: '9012-3456-1234-5678',
            state: 'Draft'
        }
    },
    {
        dateCreated: '31 October 2019',
        ccdCase: {
            id: '3456-1234-5678-9012',
            state: 'Draft'
        }
    }
];

describe.skip('multipleApplicationsMiddleware', () => {
    describe('initDashboardMiddleware', () => {
        it('should return an array of applications', (done) => {
            const revert = multipleApplicationsMiddleware.__set__('getApplications', () => {
                return Promise.resolve({applications: allApplicationsExpectedResponse});
            });
            const req = {
                session: {
                    form: {
                        applicantEmail: 'test@email.com',
                        caseType: 'gop',
                        screeners: {
                            willLeft: 'Yes'
                        }
                    }
                }
            };
            const res = {};
            const next = sinon.spy();

            multipleApplicationsMiddleware.initDashboard(req, res, next);

            setTimeout(() => {
                // expect(next.calledOnce).to.equal(true);
                expect(req.session).to.deep.equal({
                    form: {
                        applicantEmail: 'test@email.com',
                        applications: allApplicationsExpectedResponse
                    }
                });

                revert();
                done();
            });
        });
    });

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

            multipleApplicationsMiddleware.getCase(req, res);

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

            multipleApplicationsMiddleware.getCase(req, res);

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

            multipleApplicationsMiddleware.getCase(req, res);

            setTimeout(() => {
                expect(serviceStub.calledOnce).to.equal(true);
                expect(redirectSpy.calledOnce).to.equal(false);

                serviceStub.restore();
                redirectSpy.restore();

                done();
            });
        });
    });
});
