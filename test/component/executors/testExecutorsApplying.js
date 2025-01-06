'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ExecutorsAlias = require('app/steps/ui/executors/alias');
const ExecutorRoles = require('app/steps/ui/executors/roles');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');

describe('executors-applying', () => {
    let testWrapper;
    const expectedNextUrlForExecAlias = ExecutorsAlias.getUrl('*');
    const expectedNextUrlForExecRoles = ExecutorRoles.getUrl('*');

    beforeEach(() => {
        testWrapper = new TestWrapper('ExecutorsApplying');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('ExecutorsApplying', null, null, [], false, {type: caseTypes.GOP});

        it('test content loaded on the page', (done) => {
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

        it(`test it redirects to ExecutorsDealingWithEstate if there are other executors dealing with the estate: ${expectedNextUrlForExecAlias}`, (done) => {
            const data = {
                otherExecutorsApplying: 'optionYes'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForExecAlias);
        });

        it(`test it redirects to executors roles if there are no other executors dealing with the estate: ${expectedNextUrlForExecRoles}`, (done) => {
            const data = {
                otherExecutorsApplying: 'optionNo'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForExecRoles);
        });
    });
});
