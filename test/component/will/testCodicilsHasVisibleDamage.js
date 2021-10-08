'use strict';

const TestWrapper = require('test/util/TestWrapper');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');
const TaskList = require('app/steps/ui/tasklist');

describe('codicils-have-damage', () => {
    let testWrapper;
    // const expectedNextUrlForCodicilsDamageReasonKnown = DamageReasonKnown.getUrl();
    const expectedNextUrlForCodicilsDamageReasonKnown = TaskList.getUrl(); // Will need to be changed when we have new page
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('CodicilsHasVisibleDamage');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('CodicilsHasVisibleDamage', null, null, [], false, {type: caseTypes.GOP});

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

        it('test errors message for missing data', (done) => {
            const errorsToTest = ['codicilsHasVisibleDamage'];
            testWrapper.testErrors(done, {}, 'required', errorsToTest);
        });

        it(`test it redirects to TaskList page: ${expectedNextUrlForTaskList}`, (done) => {
            const data = {
                codicilsHasVisibleDamage: 'optionNo'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForTaskList);
        });

        it(`test it redirects to Damage Reason page: ${expectedNextUrlForCodicilsDamageReasonKnown}`, (done) => {
            const data = {
                codicilsHasVisibleDamage: 'optionYes',
                codicilsDamageTypes: [
                    'stapleOrPunchHoles',
                    'rustMarks',
                    'paperClipMarks',
                    'tornEdges',
                    'waterDamage',
                    'otherVisibleDamage'
                ],
                otherDamageDescription: 'further description of how the codicils were damaged'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForCodicilsDamageReasonKnown);
        });
    });
});
