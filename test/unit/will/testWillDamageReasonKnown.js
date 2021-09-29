const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const WillDamageReasonKnown = steps.WillDamageReasonKnown;

describe('WillDamageReasonKnown', () => {

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillDamageReasonKnown.constructor.getUrl();
            expect(url).to.equal('/will-damage-reason');
            done();
        });
    });

    describe('nextStepOptions()', () => {
        it('should return the correct next step options', (done) => {
            const result = WillDamageReasonKnown.nextStepOptions();
            expect(result).to.deep.equal({
                options: [{
                    key: 'willDamageReasonKnown',
                    value: 'optionYes',
                    choice: 'willDamageReasonIsKnown'
                }]
            });
            done();
        });
    });
});
