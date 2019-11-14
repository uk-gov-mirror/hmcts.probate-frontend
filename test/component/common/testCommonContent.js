'use strict';

const isEmpty = require('lodash').isEmpty;
const TestWrapper = require('test/util/TestWrapper');
const commonContent = require('app/resources/en/translation/common');
const config = require('app/config');
let localSessionData = {
    ccdCase: {
        state: 'Pending',
        id: 1234567890123456
    }
};

class TestCommonContent {
    static runTest(page, beforeEach, afterEach, cookies = [], pageOutsideIdam = false, sessionData = {}) {
        const testWrapper = new TestWrapper(page);

        if (!isEmpty(sessionData)) {
            localSessionData = Object.assign(localSessionData, sessionData);
        }

        describe('Test the help content', () => {
            it('test help block content is loaded on page', (done) => {
                if (typeof beforeEach === 'function') {
                    beforeEach();
                }

                const playbackData = {
                    helpTitle: commonContent.helpTitle,
                    helpHeading1: commonContent.helpHeading1,
                    helpHeading2: commonContent.helpHeading2,
                    helpEmailLabel: commonContent.helpEmailLabel.replace(/{contactEmailAddress}/g, config.links.contactEmailAddress)
                };

                testWrapper.agent.post('/prepare-session/form')
                    .send(localSessionData)
                    .end(() => {
                        testWrapper.testDataPlayback(done, playbackData, [], cookies);
                    });
            });

            testWrapper.destroy();
            if (typeof afterEach === 'function') {
                afterEach();
            }
        });

        describe('Test the navigation links', () => {
            if (pageOutsideIdam) {
                it('test "my account" and "sign out" links are not displayed on the page when the user is not logged in', (done) => {
                    if (typeof beforeEach === 'function') {
                        beforeEach();
                    }

                    const playbackData = {
                        myApplications: commonContent.myApplications,
                        signOut: commonContent.signOut
                    };

                    testWrapper.testContentNotPresent(done, playbackData);
                });
            }

            it('test "my account" and "sign out" links are displayed on the page when the user is logged in', (done) => {
                if (typeof beforeEach === 'function') {
                    beforeEach();
                }

                localSessionData.applicantEmail = 'test@email.com';

                testWrapper.agent.post('/prepare-session/form')
                    .send(localSessionData)
                    .end(() => {
                        const playbackData = {
                            myApplications: commonContent.myApplications,
                            signOut: commonContent.signOut
                        };

                        testWrapper.testDataPlayback(done, playbackData);
                    });
            });

            testWrapper.destroy();
            if (typeof afterEach === 'function') {
                afterEach();
            }
        });
    }
}

module.exports = TestCommonContent;
