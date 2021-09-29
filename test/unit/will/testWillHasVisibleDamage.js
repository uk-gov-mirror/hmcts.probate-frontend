const initSteps = require('app/core/initSteps');
const {expect, assert} = require('chai');
const steps = initSteps([`${__dirname}/../../../app/steps/action/`, `${__dirname}/../../../app/steps/ui`]);
const coreContextMockData = require('../../data/core-context-mock-data.json');
const caseTypes = require('app/utils/CaseTypes');
const WillHasVisibleDamage = steps.WillHasVisibleDamage;

describe('WillHasVisibleDamage', () => {

    const ctxBeforePost = {
        willHasVisibleDamage: 'optionYes',
        willDamageTypes: [
            'stapleOrPunchHoles',
            'rustMarks',
            'paperClipMarks',
            'tornEdges',
            'waterDamage',
            'otherVisibleDamage'
        ],
        otherDamageDescription: 'further description of how the will was damaged'
    };

    const ctxAfterPost = {
        willHasVisibleDamage: 'optionYes',
        willDamage: {
            damageTypesList: [
                'stapleOrPunchHoles',
                'rustMarks',
                'paperClipMarks',
                'tornEdges',
                'waterDamage',
                'otherVisibleDamage'
            ],
            otherDamageDescription: 'further description of how the will was damaged'
        },
    };

    describe('getUrl()', () => {
        it('should return the correct url', (done) => {
            const url = WillHasVisibleDamage.constructor.getUrl();
            expect(url).to.equal('/will-has-damage');
            done();
        });
    });

    describe('getContextData()', () => {
        it('should return the ctx with will damage options', (done) => {
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
                body: ctxAfterPost
            };
            const ctx = WillHasVisibleDamage.getContextData(req);
            expect(ctx).to.deep.equal({
                ...coreContextMockData,
                sessionID: 'dummy_sessionId',
                willHasVisibleDamage: 'optionYes',
                willDamage: {
                    damageTypesList: [
                        'stapleOrPunchHoles',
                        'rustMarks',
                        'paperClipMarks',
                        'tornEdges',
                        'waterDamage',
                        'otherVisibleDamage'
                    ],
                    otherDamageDescription: 'further description of how the will was damaged'
                },
                options: {
                    'stapleOrPunchHoles': true,
                    'rustMarks': true,
                    'paperClipMarks': true,
                    'tornEdges': true,
                    'waterDamage': true,
                    'otherVisibleDamage': true
                }
            });
            done();
        });
    });

    describe('handlePost()', () => {
        it ('add damageTypesList and otherDamageDescription to willDamageTypes object', () => {
            const WillHasVisibleDamage = steps.WillHasVisibleDamage;
            const [ctx] = WillHasVisibleDamage.handlePost(ctxBeforePost);
            assert.containsAllKeys(ctx.willDamage, ['damageTypesList', 'otherDamageDescription']);
        });
    });
});
