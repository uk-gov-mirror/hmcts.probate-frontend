'use strict';

const TestWrapper = require('test/util/TestWrapper');
const NewWillLeft = require('app/steps/ui/will/newleft/index');

const nock = require('nock');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const featureTogglePath = `${config.featureToggles.path}/${config.featureToggles.screening_questions}`;

describe('new-start-eligibility', () => {
    let testWrapper;
    const expectedNextUrlForNewWillLeft = NewWillLeft.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('NewStartEligibility');

        nock(featureToggleUrl)
            .get(featureTogglePath)
            .reply(200, 'true');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        it('test right content loaded on the page', (done) => {
            const excludeKeys = [];

            testWrapper.testContent(done, excludeKeys);
        });

        it(`test it redirects to next page: ${expectedNextUrlForNewWillLeft}`, (done) => {
            testWrapper.testRedirect(done, {}, expectedNextUrlForNewWillLeft);
        });

    });
});
