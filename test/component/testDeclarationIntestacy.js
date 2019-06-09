// eslint-disable-line max-lines

'use strict';

const TestWrapper = require('test/util/TestWrapper');
const Taskist = require('app/steps/ui/tasklist');
const content = require('app/resources/en/translation/declaration');
const contentDeceasedMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const contentAnyOtherChildren = require('app/resources/en/translation/deceased/anyotherchildren');
const contentRelationshipToDeceased = require('app/resources/en/translation/applicant/relationshiptodeceased');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const config = require('app/config');
const nock = require('nock');
const featureToggleUrl = config.featureToggles.url;
const intestacyQuestionsFeatureTogglePath = `${config.featureToggles.path}/${config.featureToggles.intestacy_questions}`;
const featureTogglesNock = (status = 'true') => {
    nock(featureToggleUrl)
        .get(intestacyQuestionsFeatureTogglePath)
        .reply(200, status);
};

describe('declaration, intestacy', () => {
    let testWrapper, contentData, sessionData;
    const expectedNextUrlForExecInvite = Taskist.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('Declaration');
        featureTogglesNock();

        sessionData = require('test/data/complete-form-undeclared').formdata;
        const applicantData = sessionData.applicant;
        const deceasedData = sessionData.deceased;

        contentData = {
            applicantName: `${applicantData.firstName} ${applicantData.lastName}`,
            applicantAddress: applicantData.address.formattedAddress,
            deceasedName: `${deceasedData.firstName} ${deceasedData.lastName}`,
            deceasedAddress: deceasedData.address.formattedAddress,
            deceasedDob: deceasedData.dob_formattedDate,
            deceasedDod: deceasedData.dod_formattedDate,
            ihtGrossValue: sessionData.iht.grossValueField,
            ihtNetValue: sessionData.iht.netValueField
        };

    });

    afterEach(() => {
        delete require.cache[require.resolve('test/data/complete-form-undeclared')];
        testWrapper.destroy();
        nock.cleanAll();
    });

    describe('Verify Content, Errors and Redirection', () => {
        testHelpBlockContent.runTest('Declaration', featureTogglesNock);

        it('test right content loaded on the page when deceased was divorced, the applicant is the adopted child and has siblings', (done) => {
            const contentToExclude = [
                'probateHeader',
                'legalStatementDeceased',
                'deceasedEstateLand',
                'executorApplyingHeader',
                'applicantSend',
                'declarationConfirmItem3',
                'declarationRequestsItem1',
                'declarationRequestsItem2',
                // 'intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsAdopted',
                'intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsNotAdopted',
                'intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsNotAdopted',
                'intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsNotAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsNotAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsNotAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsAdopted',
                'intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsNotAdopted',
                'intestacyDeceasedMarriedSpouseApplyingHadChildren',
                'intestacyDeceasedMarriedSpouseApplyingHadNoChildrenOrEstateLessThan250k',
                'applicantName',
                'applicantName-alias',
                'applicantName-alias-codicils',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'executorApplyingName-codicils',
                'executorNotApplyingHeader',
                'executorNotApplyingReason',
                'executorNotApplyingReason-codicils',
                'optionDiedBefore',
                'optionDiedAfter',
                'optionPowerReserved',
                'optionRenunciated',
                'additionalExecutorNotified',
                'intro-multipleApplicants',
                'legalStatementApplicant-multipleApplicants',
                'deceasedEstateLand-multipleApplicants',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantSend-codicils',
                'applicantSend-multipleApplicants',
                'applicantSend-multipleApplicants-mainApplicant',
                'applicantSend-multipleApplicants-codicils',
                'applicantSend-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants',
                'applicantName-codicils',
                'codicil',
                'codicils'
            ];
            sessionData.deceased.otherNames = {
                name_0: {
                    firstName: 'James',
                    lastName: 'Miller'
                }
            };
            sessionData.deceased.maritalStatus = contentDeceasedMaritalStatus.optionDivorced;
            sessionData.deceased.anyOtherChildren = contentAnyOtherChildren.optionYes;
            sessionData.deceased.relationshipToDeceased = contentRelationshipToDeceased.optionAdoptedChild;

            contentData.deceasedOtherNames = 'James Miller';
            contentData.deceasedMaritalStatus = contentDeceasedMaritalStatus.optionDivorced;

            testWrapper.agent.post('/prepare-session-field/caseType/intestacy')
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test errors message displayed for missing data', (done) => {
            const data = {};
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testErrors(done, data, 'required', [
                        'declarationCheckbox'
                    ]);
                });
        });

        it(`test it redirects to next page: ${expectedNextUrlForExecInvite}`, (done) => {
            sessionData = {
                executors: {
                    list: [
                        {firstName: 'Bob', lastName: 'Smith', isApplying: true, isApplicant: true}
                    ],
                    invitesSent: 'true'
                },
                declaration: {
                    hasDataChanged: false
                }
            };
            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    const data = {
                        declarationCheckbox: true
                    };
                    testWrapper.testRedirect(done, data, expectedNextUrlForExecInvite);
                });
        });
    });
});
