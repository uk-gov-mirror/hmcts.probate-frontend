'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const DeceasedDomicile = steps.DeceasedDomicile;
const content = require('app/resources/en/translation/screeners/deceaseddomicile');

describe('DeceasedDomicile', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = DeceasedDomicile.constructor.getUrl();
            expect(url).to.equal('/deceased-domicile');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return the correct url when Yes is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                domicile: content.optionYes
            };
            const nextStepUrl = DeceasedDomicile.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/iht-completed');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                domicile: content.optionNo
            };
            const nextStepUrl = DeceasedDomicile.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/notInEnglandOrWales');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = DeceasedDomicile.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'domicile',
                    value: content.optionYes,
                    choice: 'inEnglandOrWales'
                }]
            });
            done();
        });
    });
});
