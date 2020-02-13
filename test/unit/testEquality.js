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
            const formData = {
                ccdCase: {
                    id: 1234567890123456
                }
            };
            const language = 'en';
            const host = 'http://localhost:3000';

            co(function* () {
                const options = yield Equality.runnerOptions(ctx, formData, language, host);

                expect(options).to.deep.equal({
                    redirect: true,
                    url: 'http://localhost:4000/service-endpoint?serviceId=PROBATE&ccdCaseId=1234567890123456&returnUrl=http://localhost:3000/task-list&language=en'
                });
                done();
            }).catch(err => {
                done(err);
            });
        });
    });
});
