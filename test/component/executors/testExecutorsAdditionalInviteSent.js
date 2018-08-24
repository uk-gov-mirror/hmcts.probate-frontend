'use strict';
const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist/index');
// const {assert} = require('chai');

describe('executors-additional-invite-sent', () => {
    let testWrapper;
    // let sessionData;
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ExecutorsUpdateInviteSent');
        // sessionData = require('test/data/executors-invites');
    });

    afterEach(() => {
        testWrapper.destroy();
        delete require.cache[require.resolve('test/data/executors-invites')];
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test correct content loaded on the page when more than 1 other executor added', (done) => {
            testWrapper.testContent(done);
        });

        // it('test content displays only the applying executors but not the main applicant', (done) => {
        //     sessionData.executors.executorsToNotifyList = [
        //         {'fullName': 'other applicant', 'isApplying': true}
        //     ];
        //     testWrapper.agent.post('/prepare-session/form')
        //         .send(sessionData)
        //         .end(() => {
        //             testWrapper.agent.get(testWrapper.pageUrl)
        //                 .then(response => {
        //                     assert(response.text.includes('We&rsquo;ve notified the executor you&rsquo;ve added'));
        //                     done();
        //                 })
        //                 .catch(err => {
        //                     done(err);
        //                 });
        //         });
        // });
        //
        // it('test content displays only the applying executors but not the main applicant', (done) => {
        //         sessionData.executors.executorsToNotifyList = [
        //             {'fullName': 'other applicant', 'isApplying': true},
        //             {'fullName': 'harvey', 'isApplying': true}
        //         ];
        //     testWrapper.agent.post('/prepare-session/form')
        //         .send(sessionData)
        //         .end(() => {
        //             testWrapper.agent.get(testWrapper.pageUrl)
        //                 .then(response => {
        //                     assert(response.text.includes('We&rsquo;ve notified the executors you&rsquo;ve added'));
        //                     done();
        //                 })
        //                 .catch(err => {
        //                     done(err);
        //                 });;
        //         });
        // });

        it(`test it redirects to next page: ${expectedNextUrlForTaskList}`, (done) => {
            const data = {};
            testWrapper.testRedirect(done, data, expectedNextUrlForTaskList);
        });
    });
});
