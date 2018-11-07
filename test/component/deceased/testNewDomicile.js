'use strict';

const TestWrapper = require('test/util/TestWrapper');
const NewApplicantExecutor = require('app/steps/ui/applicant/newexecutor/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const commonContent = require('app/resources/en/translation/common');

const nock = require('nock');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.screening_questions}`;

describe('new-deceased-domicile', () => {
    let testWrapper;
    const expectedNextUrlForNewApplicantExecutor = NewApplicantExecutor.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('NewDeceasedDomicile');

        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        testHelpBlockContent.runTest('NewDeceasedDomicile');

        it('test right content loaded on the page', (done) => {

            testWrapper.testContent(done, []);
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {};

            testWrapper.testErrors(done, data, 'required', []);

        });

        it(`test it redirects to deceased address: ${expectedNextUrlForNewApplicantExecutor}`, (done) => {
            const data = {
                domicile: 'Yes'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForNewApplicantExecutor);
        });

        it('test save and close link is not displayed on the page', (done) => {
            const playbackData = {};
            playbackData.saveAndClose = commonContent.saveAndClose;

            testWrapper.testContentNotPresent(done, playbackData);
        });
    });
});
