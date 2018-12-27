'use strict';

const TestWrapper = require('test/util/TestWrapper');
const SpouseNotApplyingReason = require('app/steps/ui/applicant/spousenotapplyingreason/index');
const AnyChildren = require('app/steps/ui/deceased/anychildren/index');
const AnyOtherChildren = require('app/steps/ui/deceased/anyotherchildren/index');
const AdoptionPlace = require('app/steps/ui/applicant/adoptionplace/index');
const ApplicantName = require('app/steps/ui/applicant/name/index');
const StopPage = require('app/steps/ui/stoppage/index');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const content = require('app/resources/en/translation/applicant/relationshiptodeceased');
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');

describe('deceased-marital-status', () => {
    let testWrapper;
    const expectedNextUrlForSpouseNotApplyingReason = SpouseNotApplyingReason.getUrl();
    const expectedNextUrlForAnyChildren = AnyChildren.getUrl();
    const expectedNextUrlForAnyOtherChildren = AnyOtherChildren.getUrl();
    const expectedNextUrlForAdoptionPlace = AdoptionPlace.getUrl();
    const expectedNextUrlForApplicantName = ApplicantName.getUrl();
    const expectedNextUrlForStopPage = StopPage.getUrl('otherRelationship');

    beforeEach(() => {
        testWrapper = new TestWrapper('RelationshipToDeceased');
    });

    afterEach(() => {
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testHelpBlockContent.runTest('RelationshipToDeceased');

        it('test content loaded on the page', (done) => {
            const sessionData = {
                deceased: {
                    maritalStatus: contentMaritalStatus.optionMarried
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, [], {});
                });
        });

        it('test errors message displayed for missing data', (done) => {
            testWrapper.testErrors(done, {}, 'required', []);
        });

        it(`test it redirects to Spouse Not Applying Reason page if relationship is Child and deceased was married: ${expectedNextUrlForSpouseNotApplyingReason}`, (done) => {
            const sessionData = {
                deceased: {
                    maritalStatus: contentMaritalStatus.optionMarried
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        relationshipToDeceased: content.optionChild
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForSpouseNotApplyingReason);
                });
        });

        it(`test it redirects to Any Other Children page if relationship is Child and deceased was not married: ${expectedNextUrlForAnyOtherChildren}`, (done) => {
            const sessionData = {
                deceased: {
                    maritalStatus: contentMaritalStatus.optionDivorced
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        relationshipToDeceased: content.optionChild
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForAnyOtherChildren);
                });
        });

        it(`test it redirects to Adoption Place page if relationship is Adopted Child: ${expectedNextUrlForAdoptionPlace}`, (done) => {
            const data = {
                relationshipToDeceased: content.optionAdoptedChild
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForAdoptionPlace);
        });

        it(`test it redirects to Any Children page if relationship is Spouse/Partner and the estate value is > £250k: ${expectedNextUrlForAnyChildren}`, (done) => {
            const sessionData = {
                deceased: {
                    maritalStatus: contentMaritalStatus.optionMarried
                },
                iht: {
                    netValue: 450000
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        relationshipToDeceased: content.optionSpousePartner
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForAnyChildren);
                });
        });

        it(`test it redirects to Applicant Name page if relationship is Spouse/Partner and the estate value is <= £250k: ${expectedNextUrlForApplicantName}`, (done) => {
            const sessionData = {
                deceased: {
                    maritalStatus: contentMaritalStatus.optionMarried
                },
                iht: {
                    netValue: 200000
                }
            };

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        relationshipToDeceased: content.optionSpousePartner
                    };

                    testWrapper.testRedirect(done, data, expectedNextUrlForApplicantName);
                });
        });

        it(`test it redirects to Stop page if relationship is Other: ${expectedNextUrlForStopPage}`, (done) => {
            const data = {
                relationshipToDeceased: content.optionOther
            };

            testWrapper.testRedirect(done, data, expectedNextUrlForStopPage);
        });
    });
});
