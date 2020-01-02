'use strict';

const TestWrapper = require('test/util/TestWrapper');
const DeceasedName = require('app/steps/ui/deceased/name');
const DeceasedDetails = require('app/steps/ui/deceased/details');
const testCommonContent = require('test/component/common/testCommonContent.js');
const caseTypes = require('app/utils/CaseTypes');
const config = require('app/config');
const featureToggleUrl = config.featureToggles.url;
const welshFeatureTogglePath = `${config.featureToggles.path}/${config.featureToggles.welsh_ft}`;
const nock = require('nock');
const beforeEachNocks = (status = 'true') => {
    nock(featureToggleUrl)
        .get(welshFeatureTogglePath)
        .reply(200, status);
};
const afterEachNocks = (done) => {
    return () => {
        nock.cleanAll();
        done();
    };
};

describe('bilingual-gop', () => {
    let testWrapper;
    const expectedNextUrlForDeceasedName = DeceasedName.getUrl();
    const expectedNextUrlForDeceasedDetails = DeceasedDetails.getUrl();

    beforeEach(() => {
        beforeEachNocks('true');
        testWrapper = new TestWrapper('BilingualGOP');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testCommonContent.runTest('BilingualGOP', beforeEachNocks, afterEachNocks);

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(afterEachNocks(done));
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {
                bilingual: '',
            };

            testWrapper.testErrors(done, data, 'required');
        });

        it(`test it redirects to next page for a Probate case: ${expectedNextUrlForDeceasedName}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send({caseType: caseTypes.GOP})
                .end(() => {
                    const data = {
                        bilingual: 'optionNo'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForDeceasedName);
                });
        });

        it(`test it redirects to next page for an Intestacy case: ${expectedNextUrlForDeceasedDetails}`, (done) => {
            testWrapper.agent.post('/prepare-session/form')
                .send({caseType: caseTypes.INTESTACY})
                .end(() => {
                    const data = {
                        bilingual: 'optionNo'
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForDeceasedDetails);
                });
        });
    });
});
