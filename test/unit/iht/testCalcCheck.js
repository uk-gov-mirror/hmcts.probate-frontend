'use strict';

const initSteps = require('app/core/initSteps');
const expect = require('chai').expect;
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const CalcCheck = steps.CalcCheck;

describe('CalcCheck', () => {
    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = CalcCheck.constructor.getUrl();
            expect(url).to.equal('/calc-check');
            done();
        });
    });
    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = CalcCheck.nextStepOptions();
            expect(result).to.deep.equal({
                options: [
                    {key: 'calcCheckCompleted', value: 'optionYes', choice: 'calcCheckCompleted'}
                ]
            });
            done();
        });
    });
});
