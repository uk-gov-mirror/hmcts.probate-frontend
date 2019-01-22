'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const content = require('app/resources/en/translation/iht/completed');
const steps = initSteps([`${__dirname}/../../app/steps/action/`, `${__dirname}/../../app/steps/ui`]);
const IhtCompleted = steps.IhtCompleted;

describe('IhtCompleted', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = IhtCompleted.constructor.getUrl();
            expect(url).to.equal('/iht-completed');
            done();
        });
    });

    describe('nextStepUrl()', () => {
        it('should return url for the next step', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                completed: content.optionYes
            };
            const nextStepUrl = IhtCompleted.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/will-left');
            done();
        });

        it('should return the url for the stop page', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                completed: content.optionNo
            };
            const nextStepUrl = IhtCompleted.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/ihtNotCompleted');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = IhtCompleted.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'completed',
                    value: content.optionYes,
                    choice: 'completed'
                }]
            });
            done();
        });
    });
});
