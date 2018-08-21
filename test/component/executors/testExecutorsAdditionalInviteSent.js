'use strict';
const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist/index');

describe('executors-additional-invite-sent', () => {
    let testWrapper;
    let sessionData;
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ExecutorsUpdateInviteSent');
        sessionData = require('test/data/executors-invites');
    });

    afterEach(() => {
        testWrapper.destroy();
        delete require.cache[require.resolve('test/data/executors-invites')];
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test correct content loaded on the page when only 1 other executor added', (done) => {
            sessionData.executorsToNotifyList = [
                {'fullName': 'other applicant', 'isApplying': true},
            ];
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, ['header-multiple']);
                });
        });

        it('test correct content loaded on the page when more than 1 other executor added', (done) => {
            sessionData.executorsToNotifyList = [
                {'fullName': 'other applicant', 'isApplying': true},
                {'fullName': 'harvey', 'isApplying': true}
            ];
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, ['header']);
                });
        });

        it(`test it redirects to next page: ${expectedNextUrlForTaskList}`, (done) => {
            const data = {};
            testWrapper.testRedirect(done, data, expectedNextUrlForTaskList);
        });
    });
});
