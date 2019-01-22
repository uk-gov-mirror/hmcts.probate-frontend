'use strict';

const journey = require('app/journeys/probate');
const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const MentalCapacity = steps.MentalCapacity;
const content = require('app/resources/en/translation/screeners/mentalcapacity');

describe('MentalCapacity', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = MentalCapacity.constructor.getUrl();
            expect(url).to.equal('/mental-capacity');
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
                mentalCapacity: content.optionYes
            };
            const nextStepUrl = MentalCapacity.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/start-apply');
            done();
        });

        it('should return the correct url when No is given', (done) => {
            const req = {
                session: {
                    journey: journey
                }
            };
            const ctx = {
                mentalCapacity: content.optionNo
            };
            const nextStepUrl = MentalCapacity.nextStepUrl(req, ctx);
            expect(nextStepUrl).to.equal('/stop-page/mentalCapacity');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = MentalCapacity.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'mentalCapacity',
                    value: content.optionYes,
                    choice: 'isCapable'
                }]
            });
            done();
        });
    });
});
