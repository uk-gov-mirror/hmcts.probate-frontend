'use strict';

const TestWrapper = require('test/util/TestWrapper');
const ValueAssetsOutside = require('app/steps/ui/deceased/valueassetsoutside/index');
// const DeceasedAlias = require('app/steps/ui/deceased/alias/index');
const TaskList = require('app/steps/ui/tasklist/index');
const content = require('app/resources/en/translation/deceased/assetsoutside');
const commonContent = require('app/resources/en/translation/common');
const config = require('app/config');
const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_questions}`;

describe('assets-outside-england-wales', () => {
    let testWrapper;
    const expectedNextUrlForValueAssetsOutside = ValueAssetsOutside.getUrl();
    // const expectedNextUrlForDeceasedAlias = DeceasedAlias.getUrl();
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('AssetsOutside');
        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        it('test help block content is loaded on page', (done) => {
            const playbackData = {};
            playbackData.helpTitle = commonContent.helpTitle;
            playbackData.helpText = commonContent.helpText;
            playbackData.contactTelLabel = commonContent.contactTelLabel.replace('{helpLineNumber}', config.helpline.number);
            playbackData.contactOpeningTimes = commonContent.contactOpeningTimes.replace('{openingTimes}', config.helpline.hours);
            playbackData.helpEmailLabel = commonContent.helpEmailLabel;
            playbackData.contactEmailAddress = commonContent.contactEmailAddress;

            testWrapper.testDataPlayback(done, playbackData);
        });

        it('test content loaded on the page', (done) => {
            const sessionData = {
                deceased: {
                    firstName: 'John',
                    lastName: 'Doe'
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const contentData = {deceasedName: 'John Doe'};

                    testWrapper.testContent(done, [], contentData);
                });
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required', []);
        });

        it(`test it redirects to value of assets outside page: ${expectedNextUrlForValueAssetsOutside}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const data = {
                        assetsOutside: content.optionYes
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForValueAssetsOutside);
                });
        });

        // it(`test it redirects to Deceased Alias page: ${expectedNextUrlForDeceasedAlias}`, (done) => {
        //     testWrapper.agent.post('/prepare-session-field/willLeft/No')
        //         .end(() => {
        //             const data = {
        //                 assetsOutside: content.optionNo
        //             };
        //
        //             testWrapper.testRedirect(done, data, expectedNextUrlForDeceasedAlias);
        //         });
        // });

        it(`test it redirects to TaskList page: ${expectedNextUrlForTaskList}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const data = {
                        assetsOutside: content.optionNo
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForTaskList);
                });
        });
    });
});
