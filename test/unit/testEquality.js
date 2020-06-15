'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const Equality = steps.Equality;
const co = require('co');

describe('Equality', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = Equality.constructor.getUrl();
            expect(url).to.equal('/equality-and-diversity');
            done();
        });
    });

    describe('runnerOptions', () => {
        it('redirect if journey is intestacy and a none of the other conditions apply', (done) => {
            const ctx = {};
            const session = {
                uuid: '6543210987654321',
                form: {
                    applicantEmail: 'applicant@email.com',
                    ccdCase: {
                        id: 1234567890123456
                    },
                    equality: {
                        pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f'
                    }
                },
                language: 'en'
            };
            const host = 'http://localhost:3000';

            co(function* () {
                const options = yield Equality.runnerOptions(ctx, session, host);
                const token = '79d3c3968c1b94baa8753a66c72a3382aacb1152f20fac4ba2ad7c754adf464a538a77496a281db63b2ca' +
                    'aa49380fcb5f4210a0fc3933a0c4d5f2f790c026df47946c7b8640dc476f47a12822df5c38590dc16c9c9b4143ccca4' +
                    'a76f32aa1bb16a3bd24a0dd30cd31f8ca5f93a46a99ed931f95b20914604b6bddef910b23dbf49f61c2c98c073e0b1f' +
                    '0d4ac2d5b7d05f6cb5cf518eb77c93aaea05970ca3d8f1150952182b1e2ea316dbef1ba85e71aeb6fa34518fff46c12' +
                    'c54827ba59926a0ed5721a2cd25fdb6c0911a6089af86f155d445140a9cdbfd68170d261a9d766';

                expect(options).to.deep.equal({
                    redirect: true,
                    url: `http://localhost:4000/service-endpoint?serviceId=PROBATE&actor=APPLICANT&pcqId=78e69022-2468-4370-a88e-bea2a80fa51f&ccdCaseId=1234567890123456&partyId=applicant@email.com&returnUrl=http://localhost:3000/task-list&language=en&token=${token}`
                });
                done();
            }).catch(err => {
                done(err);
            });
        });
    });

    describe('isComplete()', () => {
        it('should return the completion status correctly if question already asked', (done) => {
            const ctx = {};
            const formdata = {
                equality: {
                    pcqId: '78e69022-2468-4370-a88e-bea2a80fa51f'
                }
            };
            const complete = Equality.isComplete(ctx, formdata);
            expect(complete).to.deep.equal([true, 'inProgress']);
            done();
        });

        it('should return the completion status correctly if question not asked but payment completed', (done) => {
            const ctx = {};
            const formdata = {
                payment: {
                    status: 'Success'
                }
            };
            const complete = Equality.isComplete(ctx, formdata);
            expect(complete).to.deep.equal([true, 'inProgress']);
            done();
        });
    });
});
