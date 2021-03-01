'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire');
const completeEqualityTask = rewire('app/middleware/completeEqualityTask');

let equalityStub;
const startStub = () => {
    equalityStub = require('test/service-stubs/equalityAndDiversityHealth');
};
const stopStub = () => {
    equalityStub.close();
    delete require.cache[require.resolve('test/service-stubs/equalityAndDiversityHealth')];
};
describe('completeEqualityTask', () => {
    describe('PCQ feature toggle is ON and health is UP', () => {
        before(() => startStub());

        it('should redirect to PCQ', (done) => {
            const params = {
                isEnabled: true,
                req: {
                    session: {
                        caseType: 'gop',
                        form: {
                            applicantEmail: 'test@email.com',
                            ccdCase: {
                                id: 1234567890123456
                            }
                        }
                    }
                },
                res: {
                    locals: {launchDarkly: {}},
                    redirect: () => {
                        // Do nothing
                    }
                },
                next: sinon.spy()
            };

            completeEqualityTask(params);

            setTimeout(() => {
                expect(params.req.session.form.equality.pcqId).to.not.equal('Service down');
                expect(params.next.calledOnce).to.equal(true);

                done();
            }, 500);
        });

        after(() => stopStub());
    });

    describe('PCQ feature toggle is ON and health is DOWN', () => {
        it('[PROBATE] should redirect to Task List', (done) => {
            const params = {
                isEnabled: true,
                req: {
                    session: {
                        caseType: 'gop',
                        form: {
                            applicantEmail: 'test@email.com',
                            ccdCase: {
                                id: 1234567890123456
                            }
                        }
                    }
                },
                res: {
                    redirect: sinon.spy()
                },
                next: sinon.spy()
            };

            completeEqualityTask(params);

            setTimeout(() => {
                sinon.assert.calledOnce(params.res.redirect);
                expect(params.res.redirect.calledOnce).to.equal(true);
                expect(params.res.redirect).to.have.been.calledWith('/task-list');

                done();
            }, 2500);
        });

        it('[INTESTACY] should redirect to Summary', (done) => {
            const params = {
                isEnabled: true,
                req: {
                    session: {
                        caseType: 'intestacy',
                        form: {
                            applicantEmail: 'test@email.com',
                            ccdCase: {
                                id: 1234567890123456
                            }
                        }
                    }
                },
                res: {
                    redirect: sinon.spy()
                },
                next: sinon.spy()
            };

            completeEqualityTask(params);

            setTimeout(() => {
                sinon.assert.calledOnce(params.res.redirect);
                expect(params.res.redirect.calledOnce).to.equal(true);
                expect(params.res.redirect).to.have.been.calledWith('/summary');

                done();
            }, 2500);
        });
    });

    describe('PCQ feature toggle is OFF', () => {
        it('[PROBATE] should redirect to Task List', (done) => {
            const params = {
                isEnabled: false,
                req: {
                    session: {
                        caseType: 'gop',
                        form: {
                            applicantEmail: 'test@email.com',
                            ccdCase: {
                                id: 1234567890123456
                            }
                        }
                    }
                },
                res: {
                    redirect: sinon.spy()
                },
                next: sinon.spy()
            };

            completeEqualityTask(params);

            setTimeout(() => {
                sinon.assert.calledOnce(params.res.redirect);
                expect(params.res.redirect.calledOnce).to.equal(true);
                expect(params.res.redirect).to.have.been.calledWith('/task-list');

                done();
            }, 500);
        });

        it('[INTESTACY] should redirect to Summary', (done) => {
            const params = {
                isEnabled: false,
                req: {
                    session: {
                        caseType: 'intestacy',
                        form: {
                            applicantEmail: 'test@email.com',
                            ccdCase: {
                                id: 1234567890123456
                            }
                        }
                    }
                },
                res: {
                    redirect: sinon.spy()
                },
                next: sinon.spy()
            };

            completeEqualityTask(params);

            setTimeout(() => {
                sinon.assert.calledOnce(params.res.redirect);
                expect(params.res.redirect.calledOnce).to.equal(true);
                expect(params.res.redirect).to.have.been.calledWith('/summary');

                done();
            }, 500);
        });
    });
});
