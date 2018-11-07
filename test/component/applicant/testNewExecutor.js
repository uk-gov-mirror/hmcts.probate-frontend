'use strict';

const TestWrapper = require('test/util/TestWrapper');
const NewMentalCapacity = require('app/steps/ui/executors/newmentalcapacity/index');
const StopPage = require('app/steps/ui/stoppage/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');

const nock = require('nock');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.screening_questions}`;

describe('new-applicant-executor', () => {
    let testWrapper;
    const expectedNextUrlForNewMentalCapacity = NewMentalCapacity.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('notExecutor');

    beforeEach(() => {
        testWrapper = new TestWrapper('NewApplicantExecutor');

        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        testHelpBlockContent.runTest('NewApplicantExecutor');

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done);
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {};
            testWrapper.testErrors(done, data, 'required');
        });

        it(`test it redirects to mental capacity page if applicant is an executor: ${expectedNextUrlForNewMentalCapacity}`, (done) => {
            const data = {
                executor: 'Yes'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForNewMentalCapacity);
        });

        it(`test it redirects to stop page if applicant is NOT an executor${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                executor: 'No'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
        });
    });
});
