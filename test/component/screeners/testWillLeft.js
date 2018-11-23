'use strict';

const config = require('app/config');
const TestWrapper = require('test/util/TestWrapper');
const WillOriginal = require('app/steps/ui/screeners/willoriginal/index');
const DiedAfterOctober2014 = require('app/steps/ui/screeners/diedafteroctober2014/index');
const StopPage = require('app/steps/ui/stoppage/index');
const commonContent = require('app/resources/en/translation/common');
const cookies = [{
    name: config.redis.eligibilityCookie.name,
    content: {
        nextStepUrl: '/will-left',
        pages: [
            '/death-certificate',
            '/deceased-domicile',
            '/iht-completed'
        ]
    }
}];

const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_screening_questions}`;

describe('will-left', () => {
    let testWrapper;
    const expectedNextUrlForWillOriginal = WillOriginal.getUrl();
    const expectedNextUrlForDiedAfterOctober2014 = DiedAfterOctober2014.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('noWill');

    beforeEach(() => {
        testWrapper = new TestWrapper('WillLeft');
    });

    afterEach(() => {
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        // it('test help block content is loaded on page', (done) => {
        //     const playbackData = {};
        //     playbackData.helpTitle = commonContent.helpTitle;
        //     playbackData.helpText = commonContent.helpText;
        //     playbackData.contactTelLabel = commonContent.contactTelLabel.replace('{helpLineNumber}', config.helpline.number);
        //     playbackData.contactOpeningTimes = commonContent.contactOpeningTimes.replace('{openingTimes}', config.helpline.hours);
        //     playbackData.helpEmailLabel = commonContent.helpEmailLabel;
        //     playbackData.contactEmailAddress = commonContent.contactEmailAddress;
        //
        //     testWrapper.testDataPlayback(done, playbackData, cookies);
        // });
        //
        // it('test content loaded on the page', (done) => {
        //     testWrapper.testContent(done, [], {}, cookies);
        // });
        //
        // it('test errors message displayed for missing data', (done) => {
        //     const data = {};
        //
        //     testWrapper.testErrors(done, data, 'required', [], cookies);
        // });
        //
        // it(`test it redirects to next page: ${expectedNextUrlForWillOriginal}`, (done) => {
        //     const data = {
        //         left: 'Yes'
        //     };
        //
        //     testWrapper.testRedirect(done, data, expectedNextUrlForWillOriginal, cookies);
        // });

        it(`test it redirects to next page: ${expectedNextUrlForDiedAfterOctober2014}`, (done) => {
            nock(featureToggleUrl)
                .get(featureTogglePath)
                .reply(200, 'true');

            const data = {
                left: 'No'
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForDiedAfterOctober2014, cookies);

            // const sessionData = {
            //     featureToggles: {
            //         intestacy_screening_questions: true
            //     }
            // };
            //
            // const data = {
            //     left: 'No'
            // };
            //
            // testWrapper.agent.post('/prepare-session/featureToggles')
            //     .send(sessionData.featureToggles)
            //     .end(() => {
            //         testWrapper.testRedirect(done, data, expectedNextUrlForDiedAfterOctober2014, cookies);
            //     });
        });

        // it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
        //     nock(featureToggleUrl)
        //         .get(featureTogglePath)
        //         .reply(200, 'false');
        //
        //     const data = {
        //         left: 'No'
        //     };
        //
        //     testWrapper.testRedirect(done, data, expectedNextUrlForStopPage, cookies);
        // });
        //
        // it('test save and close link is not displayed on the page', (done) => {
        //     const playbackData = {};
        //     playbackData.saveAndClose = commonContent.saveAndClose;
        //
        //     testWrapper.testContentNotPresent(done, playbackData);
        // });
    });
});
