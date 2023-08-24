'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const HmrcCheck = steps.HmrcCheck;

describe('HmrcCheck', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = HmrcCheck.constructor.getUrl();
            expect(url).to.equal('/hmrc-check');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct options', (done) => {
            const nextStepOptions = HmrcCheck.nextStepOptions();
            expect(nextStepOptions).to.deep.equal({
                options: [{
                    key: 'estateValueCompleted',
                    value: 'optionYes',
                    choice: 'ihtEstateFormsCompleted'
                }]
            });
            done();
        });
    });
});
