'use strict';

const TestWrapper = require('test/util/TestWrapper');
const StopPage = require('app/steps/ui/stoppage/index');
const TaskList = require('app/steps/ui/tasklist/index');
const commonContent = require('app/resources/en/translation/common');
const config = require('app/config');
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const content = require('app/resources/en/translation/deceased/divorceplace');

describe('deceased-marital-status', () => {
    let testWrapper;
    const expectedNextUrlForStopPage = StopPage.getUrl('divorcePlace');
    const expectedNextUrlForTaskList = TaskList.getUrl();
    const sessionData = {
        deceased: {
            maritalStatus: contentMaritalStatus.optionDivorced
        }
    };

    beforeEach(() => {
        testWrapper = new TestWrapper('DivorcePlace');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test help block content is loaded on page', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const playbackData = {};
                    playbackData.helpTitle = commonContent.helpTitle;
                    playbackData.helpText = commonContent.helpText;
                    playbackData.contactTelLabel = commonContent.contactTelLabel.replace('{helpLineNumber}', config.helpline.number);
                    playbackData.contactOpeningTimes = commonContent.contactOpeningTimes.replace('{openingTimes}', config.helpline.hours);
                    playbackData.helpEmailLabel = commonContent.helpEmailLabel;
                    playbackData.contactEmailAddress = commonContent.contactEmailAddress;

                    testWrapper.testDataPlayback(done, playbackData);
                });
        });

        it('test content loaded on the page', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {legalProcess: contentMaritalStatus.divorce};

                    testWrapper.testContent(done, [], contentData);
                });
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testErrors(done, {}, 'required', []);
                });
        });

        it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                divorcePlace: content.optionNo
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
                });
        });

        it(`test it redirects to tasklist: ${expectedNextUrlForTaskList}`, (done) => {
            const data = {
                divorcePlace: content.optionYes
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testRedirect(done, data, expectedNextUrlForTaskList);
                });
        });
    });
});
