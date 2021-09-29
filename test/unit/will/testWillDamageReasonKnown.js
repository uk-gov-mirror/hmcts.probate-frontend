const initSteps = require('app/core/initSteps');
const {expect} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const caseTypes = require('app/utils/CaseTypes');
const WillDamageReasonKnown = steps.WillDamageReasonKnown;

describe('WillDamageReasonKnown', () => {

    const ctxWithYes = {
        willDamageReasonKnown: 'optionYes',
        willDamageReasonDescription: 'Damage description'
    };

    const ctxWithNo = {
        willDamageReasonKnown: 'optionNo'
    };

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillDamageReasonKnown.constructor.getUrl();
            expect(url).to.equal('/will-damage-reason');
            done();
        });
    });

    describe('handleGet()', () => {
        it('should return the ctx with will damage reason', (done) => {
            const req = {
                sessionID: 'dummy_sessionId',
                session: {
                    language: 'en',
                    form: {
                        caseType: caseTypes.GOP,
                        ccdCase: {
                            id: 1234567890123456,
                            state: 'Pending'
                        }
                    },
                    caseType: caseTypes.GOP
                },
                body: ctxWithYes
            };
            const [ctx] = WillDamageReasonKnown.handleGet(req);
            expect(ctx.body).to.deep.equal({
                willDamageReasonKnown: 'optionYes',
                willDamageReasonDescription: 'Damage description'
            });
            done();
        });
    });

    describe('handlePost()', () => {
        it ('add reasonKnown and reason Description', () => {
            const WillDamageReasonKnown = steps.WillDamageReasonKnown;
            const [ctx] = WillDamageReasonKnown.handlePost(ctxWithYes);
            expect(ctx).to.deep.equal(ctxWithYes);
        });
    });

    describe('handlePost()', () => {
        it ('add reasonKnown NO', () => {
            const WillDamageReasonKnown = steps.WillDamageReasonKnown;
            const [ctx] = WillDamageReasonKnown.handlePost(ctxWithNo);
            expect(ctx).to.deep.equal(ctxWithNo);
        });
    });

});
