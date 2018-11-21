'use strict';

const TestWrapper = require('test/util/TestWrapper');
const TaskList = require('app/steps/ui/tasklist/index');
const commonContent = require('app/resources/en/translation/common');
const cookies = [{
    name: '__eligibility',
    content: {
        nextStepUrl: '/new-start-apply',
        pages: [
            '/new-death-certificate',
            '/new-deceased-domicile',
            '/new-iht-completed',
            '/new-will-left',
            '/new-will-original',
            '/new-applicant-executor',
            '/new-mental-capacity'
        ]
    }
}];

describe('start-apply', () => {
    let testWrapper;
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('StartApply');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test content loaded on the page', (done) => {
            const excludeKeys = [];

            testWrapper.testContent(done, excludeKeys, {}, cookies);
        });

        it(`test it redirects to next page: ${expectedNextUrlForTaskList}`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForTaskList, cookies);
        });

        it('test save and close link is not displayed on the page', (done) => {
            const playbackData = {};
            playbackData.saveAndClose = commonContent.saveAndClose;

            testWrapper.testContentNotPresent(done, playbackData);
        });
    });
});
