'use strict';

const TestWrapper = require('test/util/TestWrapper');
const NewDeceasedDomicile = require('app/steps/ui/deceased/newdomicile/index');
const StopPage = require('app/steps/ui/stoppage/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');

const nock = require('nock');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.screening_questions}`;

describe('new-death-certificate', () => {
    let testWrapper;
    const expectedNextUrlForNewDeceasedDomicile = NewDeceasedDomicile.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('deathCertificate');

    beforeEach(() => {
        testWrapper = new TestWrapper('NewDeathCertificate');

        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        testHelpBlockContent.runTest('NewDeathCertificate');

        it('test right content loaded on the page', (done) => {

            testWrapper.testContent(done, []);
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {};

            testWrapper.testErrors(done, data, 'required', []);

        });

        it(`test it redirects to iht completed: ${expectedNextUrlForNewDeceasedDomicile}`, (done) => {
            const data = {
                deathCertificate: 'Yes'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForNewDeceasedDomicile);
        });

        it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                deathCertificate: 'No'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
        });

    });
});
