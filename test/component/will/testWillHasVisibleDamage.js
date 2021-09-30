'use strict';

const TestWrapper = require('test/util/TestWrapper');
const DamageReasonKown = require('app/steps/ui/willdamagereasonknown');
const Codicils = require('app/steps/ui/will/codicils');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');

describe('will-has-damage', () => {
    let testWrapper;
    const expectedNextUrlForWillHasDamageReasonKnown = DamageReasonKown.getUrl();
    const expectedNextUrlForCodicils = Codicils.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('WillHasVisibleDamage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('WillHasVisibleDamage', null, null, [], false, {type: caseTypes.GOP});

        it('test correct content loaded on the page', (done) => {
            const sessionData = {
                type: caseTypes.GOP,
                ccdCase: {
                    state: 'Pending',
                    id: 1234567890123456
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done);
                });
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required');
        });

        it(`test it redirects to Codicils page: ${expectedNextUrlForCodicils}`, (done) => {
            const data = {
                codicils: 'optionNo'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForCodicils);
        });

        it(`test it redirects to Damage Reason page: ${expectedNextUrlForWillHasDamageReasonKnown}`, (done) => {
            const data = {
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

            testWrapper.testRedirect(done, data, expectedNextUrlForWillHasDamageReasonKnown);
        });
    });
});
