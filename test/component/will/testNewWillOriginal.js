'use strict';

const TestWrapper = require('test/util/TestWrapper');
const NewDeathCertificate = require('app/steps/ui/deceased/newdeathcertificate/index');
const StopPage = require('app/steps/ui/stoppage/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');

const nock = require('nock');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.screening_questions}`;

describe('new-will-original', () => {
    let testWrapper;
    const expectedNextUrlForStopPage = StopPage.getUrl('notOriginal');
    const expectedNextUrlForNewDeathCertificate = NewDeathCertificate.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('NewWillOriginal');

        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        testHelpBlockContent.runTest('NewWillOriginal');

        it('test right content loaded on the page', (done) => {
            const excludeKeys = [];

            testWrapper.testContent(done, excludeKeys);
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {};

            testWrapper.testErrors(done, data, 'required', []);
        });

        it(`test it redirects to will codicils: ${expectedNextUrlForNewDeathCertificate}`, (done) => {
            const data = {
                'original': 'Yes'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForNewDeathCertificate);
        });

        it(`test it redirects to stop page: ${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                'original': 'No'
            };
            testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
        });

    });
});
