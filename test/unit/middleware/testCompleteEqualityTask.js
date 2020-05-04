'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
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
    describe('when the service is UP', () => {
        before(() => startStub());

        it('[PROBATE] PCQ feature toggle is ON', (done) => {
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
                res: {redirect: () => {
                    // Do nothing
                }},
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

    // describe('when the service is DOWN', () => {
    //     it('[PROBATE] PCQ status is DOWN', (done) => {
    //         const req = {
    //             session: {
    //                 caseType: 'gop',
    //                 form: {
    //                     applicantEmail: 'test@email.com',
    //                     ccdCase: {
    //                         id: 1234567890123456
    //                     }
    //                 }
    //             }
    //         };
    //         const res = {redirect: () => {
    //             // Do nothing
    //         }};
    //         const redirectSpy = sinon.spy(res, 'redirect');
    //         const next = sinon.spy();
    //
    //         completeEqualityTask(req, res, next);
    //
    //         setTimeout(() => {
    //             expect(req.session.form.equality.pcqId).to.equal('Service down');
    //             expect(redirectSpy.calledOnce).to.equal(true);
    //             expect(redirectSpy.calledWith('/task-list')).to.equal(true);
    //             redirectSpy.restore();
    //             done();
    //         }, 500);
    //     });
    //
    //     it('[INTESTACY] PCQ status is DOWN', (done) => {
    //         const req = {
    //             session: {
    //                 caseType: 'intestacy',
    //                 form: {
    //                     applicantEmail: 'test@email.com',
    //                     ccdCase: {
    //                         id: 1234567890123456
    //                     }
    //                 }
    //             }
    //         };
    //         const res = {redirect: () => {
    //             // Do nothing
    //         }};
    //         const redirectSpy = sinon.spy(res, 'redirect');
    //         const next = sinon.spy();
    //
    //         completeEqualityTask(req, res, next);
    //
    //         setTimeout(() => {
    //             expect(req.session.form.equality.pcqId).to.equal('Service down');
    //             expect(redirectSpy.calledOnce).to.equal(true);
    //             expect(redirectSpy.calledWith('/summary')).to.equal(true);
    //             redirectSpy.restore();
    //             done();
    //         }, 500);
    //     });
    // });
});
