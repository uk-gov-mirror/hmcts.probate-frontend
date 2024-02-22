'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const CopiesSummary = steps.CopiesSummary;

describe('CopiesSummary', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = CopiesSummary.constructor.getUrl();
            expect(url).to.equal('/copies-summary');
            done();
        });
    });

    describe('generateFields()', () => {
        it('it should set Google analytics enabled to true', (done) => {
            const ctx = {
                session: {
                    form: {},
                },
                isGaEnabled: true
            };
            const fields = CopiesSummary.generateFields('en', ctx, [], {});
            expect(fields.isGaEnabled.value).to.deep.equal('true');
            done();
        });

        it('it should set Google analytics enabled to false', (done) => {
            const ctx = {
                session: {
                    form: {},
                }
            };
            const fields = CopiesSummary.generateFields('en', ctx, [], {});
            expect(fields.isGaEnabled.value).to.deep.equal('false');
            done();
        });
    });
});
