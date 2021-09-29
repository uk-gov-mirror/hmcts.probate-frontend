const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
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
});
