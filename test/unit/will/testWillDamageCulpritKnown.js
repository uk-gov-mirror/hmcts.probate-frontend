const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const WillDamageCulpritKnown = steps.WillDamageCulpritKnown;

describe('WillDamageCulpritKnown', () => {

    const ctxBeforePost = {
        willDamageCulpritKnown: 'optionYes',
        firstName: 'Culprit first name',
        lastName: 'Culprit last name'
    };
    const ctxWithNo = {
        willDamageCulpritKnown: 'optionNo',
    };

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillDamageCulpritKnown.constructor.getUrl();
            expect(url).to.equal('/will-damage-who');
            done();
        });
    });

    describe('handlePost()', () => {
        const willDamageCulpritKnown = steps.WillDamageCulpritKnown;
        it('add firstName and lastName to willDamageCulpritName object', () => {
            const [ctx] = willDamageCulpritKnown.handlePost(ctxBeforePost);
            assert.containsAllKeys(ctx.willDamageCulpritName, ['firstName', 'lastName']);
        });
        it ('add empty willDamageCulpritName for No selected', () => {
            const [ctx] = willDamageCulpritKnown.handlePost(ctxWithNo);
            assert.equal(ctx.willDamageCulpritName, null);
            assert.equal(ctx.firstName, null);
            assert.equal(ctx.lastName, null);
        });
    });
});
