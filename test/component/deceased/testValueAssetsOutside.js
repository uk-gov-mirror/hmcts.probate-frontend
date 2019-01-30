'use strict';

const TestWrapper = require('test/util/TestWrapper');
// const DeceasedAlias = require('app/steps/ui/deceased/alias/index');
const TaskList = require('app/steps/ui/tasklist/index');
const commonContent = require('app/resources/en/translation/common');
const config = require('app/config');
const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_questions}`;

describe('value-assets-outside-england-wales', () => {
    let testWrapper;
    // const expectedNextUrlForDeceasedAlias = DeceasedAlias.getUrl();
    const expectedNextUrlForTaskList = TaskList.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('ValueAssetsOutside');
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
            testWrapper.testContent(done, [], {});
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required', []);
        });

        // it(`test it redirects to next page: ${expectedNextUrlForDeceasedAlias}`, (done) => {
        //     testWrapper.agent.post('/prepare-session-field/willLeft/No')
        //         .end(() => {
        //             const data = {
        //                 netValueAssetsOutside: '300000'
        //             };
        //
        //             testWrapper.testRedirect(done, data, expectedNextUrlForDeceasedAlias);
        //         });
        // });

        it(`test it redirects to TaskList page: ${expectedNextUrlForTaskList}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const data = {
                        netValueAssetsOutside: '300000'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForTaskList);
                });
        });
    });
});
