'use strict';

const TestWrapper = require('test/util/TestWrapper');
const SpouseNotApplyingReason = require('app/steps/ui/applicant/spousenotapplyingreason/index');
const AnyOtherChildren = require('app/steps/ui/deceased/anyotherchildren/index');
const StopPage = require('app/steps/ui/stoppage/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const content = require('app/resources/en/translation/applicant/adoptionplace');
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const config = require('app/config');
const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const intestacyQuestionsFeatureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_questions}`;
const featureTogglesNock = (status = 'true') => {
    nock(featureToggleUrl)
        .get(intestacyQuestionsFeatureTogglePath)
        .reply(200, status);
};

describe('adoption-place', () => {
    let testWrapper;
    const expectedNextUrlForSpouseNotApplyingReason = SpouseNotApplyingReason.getUrl();
    const expectedNextUrlForAnyOtherChildren = AnyOtherChildren.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('adoptionNotEnglandOrWales');

    beforeEach(() => {
        testWrapper = new TestWrapper('AdoptionPlace');
        featureTogglesNock();
    });

    afterEach(() => {
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testHelpBlockContent.runTest('AdoptionPlace', featureTogglesNock);

        it('test content loaded on the page', (done) => {
            testWrapper.testContent(done, [], {});
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required', []);
        });

        it(`test it redirects to Spouse Not Applying Reason page if adoption took place in England or Wales and deceased was married: ${expectedNextUrlForSpouseNotApplyingReason}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const sessionData = {
                        deceased: {
                            maritalStatus: contentMaritalStatus.optionMarried
                        }
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const data = {
                                adoptionPlace: content.optionYes
                            };

                            testWrapper.testRedirect(done, data, expectedNextUrlForSpouseNotApplyingReason);
                        });
                });
        });

        it(`test it redirects to Any Other Children page if adoption took place in England or Wales and deceased was not married: ${expectedNextUrlForAnyOtherChildren}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const sessionData = {
                        deceased: {
                            maritalStatus: contentMaritalStatus.optionDivorced
                        }
                    };

                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            const data = {
                                adoptionPlace: content.optionYes
                            };

                            testWrapper.testRedirect(done, data, expectedNextUrlForAnyOtherChildren);
                        });
                });
        });

        it(`test it redirects to Stop page if adoption took place outside England or Wales: ${expectedNextUrlForStopPage}`, (done) => {
            testWrapper.agent.post('/prepare-session-field/willLeft/No')
                .end(() => {
                    const data = {
                        adoptionPlace: content.optionNo
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
                });
        });
    });
});
