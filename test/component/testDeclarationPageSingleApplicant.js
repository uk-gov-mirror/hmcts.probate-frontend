// eslint-disable-line max-lines
'use strict';

const TestWrapper = require('test/util/TestWrapper');
const Taskist = require('app/steps/ui/tasklist/index');
const declarationContent = require('app/resources/en/translation/declaration');
const testHelpBlockContent = require('test/component/common/testHelpBlockContent.js');
const {assert} = require('chai');

describe('declaration, single applicant', () => {
    let testWrapper, contentData, sessionData;
    const expectedNextUrlForExecInvite = Taskist.getUrl();

    beforeEach(() => {
        testWrapper = new TestWrapper('Declaration');

        sessionData = require('test/data/complete-form-undeclared').formdata;
        const applicantData = sessionData.applicant;
        const deceasedData = sessionData.deceased;

        contentData = {
            applicantName: `${applicantData.firstName} ${applicantData.lastName}`,
            applicantWillName: `${applicantData.firstName} ${applicantData.lastName}`,
            applicantAddress: applicantData.address,
            deceasedName: `${deceasedData.firstName} ${deceasedData.lastName}`,
            deceasedAddress: deceasedData.address,
            deceasedDob: deceasedData.dob_formattedDate,
            deceasedDod: deceasedData.dod_formattedDate,
            ihtGrossValue: sessionData.iht.grossValue,
            ihtNetValue: sessionData.iht.netValue
        };
    });

    afterEach(() => {
        delete require.cache[require.resolve('test/data/complete-form-undeclared')];
        testWrapper.destroy();
    });

    describe('Verify Content, Errors and Redirection', () => {

        testHelpBlockContent.runTest('WillLeft');

        it('test right content loaded on the page when deceased has one other name, no codicils', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'executorApplyingName-codicils', 'executorNotApplyingHeader', 'executorNotApplyingReason', 'executorNotApplyingReason-codicils', 'optionDiedBefore', 'optionDiedAfter', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign-codicils', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils'];
            sessionData.deceased.otherNames = {
                name_0: {
                    firstName: 'James',
                    lastName: 'Miller'
                }
            };
            contentData.deceasedOtherNames = 'James Miller';

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has two other names, no codicils', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'executorApplyingName-codicils', 'executorNotApplyingHeader', 'executorNotApplyingReason', 'executorNotApplyingReason-codicils', 'optionDiedBefore', 'optionDiedAfter', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign-codicils', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils'];
            sessionData.deceased.otherNames = {
                name_0: {firstName: 'James', lastName: 'Miller'},
                name_1: {firstName: 'Joe', lastName: 'Smith'}
            };
            contentData.deceasedOtherNames = 'James Miller and Joe Smith';

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has three other names, no codicils', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'executorApplyingName-codicils', 'executorNotApplyingHeader', 'executorNotApplyingReason', 'executorNotApplyingReason-codicils', 'optionDiedBefore', 'optionDiedAfter', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign-codicils', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils'];
            sessionData.deceased.otherNames = {
                name_0: {firstName: 'James', lastName: 'Miller'},
                name_1: {firstName: 'Joe', lastName: 'Smith'},
                name_2: {firstName: 'Ed', lastName: 'Brown'}
            };
            contentData.deceasedOtherNames = 'James Miller, Joe Smith and Ed Brown';

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has no other names, no codicils', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'deceasedOtherNames', 'executorApplyingName-codicils', 'executorNotApplyingHeader', 'executorNotApplyingReason', 'executorNotApplyingReason-codicils', 'optionDiedBefore', 'optionDiedAfter', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign-codicils', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils'];
            delete contentData.deceasedOtherNames;

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has no other names and there are codicils', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'deceasedOtherNames', 'executorApplyingName', 'executorNotApplyingHeader', 'executorNotApplyingReason', 'executorNotApplyingReason-codicils', 'optionDiedBefore', 'optionDiedAfter', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils', 'applicantName'];
            sessionData.will.codicils = 'Yes';
            delete contentData.deceasedOtherNames;

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has no other names, no codicils and multiple executors (optionPowerReserved and additionalExecutorNotified)', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'executorApplyingName-codicils', 'deceasedOtherNames', 'executorApplyingName', 'executorNotApplyingReason-codicils', 'optionDiedBefore', 'optionDiedAfter', 'optionRenunciated', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign-codicils', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-codicils', 'applicantSign-codicils', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils', 'applicantName'];
            const executor = {
                fullName: 'James Miller',
                isDead: false,
                isApplying: false,
                notApplyingKey: 'optionPowerReserved',
                executorNotified: 'Yes'
            };
            contentData.otherExecutorName = executor.fullName;
            contentData.otherExecutorApplying = declarationContent.optionPowerReserved;
            sessionData.executors.list.push(executor);

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has no other names, there are codicils and multiple executors (optionDiedBefore)', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'deceasedOtherNames', 'executorApplyingName', 'executorNotApplyingReason', 'optionDiedAfter', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils', 'applicantName'];
            const executor = {
                fullName: 'Joe Smith',
                isDead: true,
                diedBefore: 'Yes',
                notApplyingKey: 'optionDiedBefore'
            };
            sessionData.will.codicils = 'Yes';
            contentData.otherExecutorName = executor.fullName;
            contentData.otherExecutorApplying = declarationContent.optionDiedBefore.replace('{deceasedName}', sessionData.deceased.deceasedName);
            sessionData.executors.list.push(executor);

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has no other names, there are codicils and multiple executors (optionDiedAfter)', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'deceasedOtherNames', 'executorApplyingName', 'executorNotApplyingReason', 'optionDiedBefore', 'optionPowerReserved', 'optionRenunciated', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils', 'applicantName'];
            const executor = {
                fullName: 'Ed Brown',
                isDead: true,
                diedBefore: 'No',
                notApplyingKey: 'optionDiedAfter'
            };
            sessionData.will.codicils = 'Yes';
            contentData.otherExecutorName = executor.fullName;
            contentData.otherExecutorApplying = declarationContent.optionDiedAfter.replace('{deceasedName}', sessionData.deceased.deceasedName);
            sessionData.executors.list.push(executor);

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page when deceased has no other names, there are codicils and multiple executors (optionRenunciated)', (done) => {
            const contentToExclude = ['applicantName-multipleApplicants-alias', 'applicantName-multipleApplicants-alias-codicils', 'applicantName-multipleApplicants-mainApplicant-alias', 'applicantName-multipleApplicants-mainApplicant-alias-codicils', 'deceasedOtherNames', 'executorApplyingName', 'executorNotApplyingReason', 'optionDiedBefore', 'optionDiedAfter', 'optionPowerReserved', 'additionalExecutorNotified', 'intro-multipleApplicants', 'legalStatementApplicant-multipleApplicants', 'deceasedEstateLand-multipleApplicants', 'applicantName-multipleApplicants', 'applicantName-multipleApplicants-codicils', 'applicantName-multipleApplicants-mainApplicant', 'applicantName-multipleApplicants-mainApplicant-codicils', 'applicantSign', 'applicantSign-multipleApplicants', 'applicantSign-multipleApplicants-codicils', 'applicantSign-multipleApplicants-mainApplicant', 'applicantSign-multipleApplicants-mainApplicant-codicils', 'declarationConfirm-multipleApplicants', 'declarationRequests-multipleApplicants', 'declarationUnderstand-multipleApplicants', 'declarationUnderstandItem1-multipleApplicants', 'declarationUnderstandItem2-multipleApplicants', 'submitWarning-multipleApplicants', 'applicantName-codicils', 'applicantName'];
            const executor = {
                fullName: 'Fred Jones',
                isDead: false,
                isApplying: false,
                notApplyingKey: 'optionRenunciated'
            };
            sessionData.will.codicils = 'Yes';
            contentData.otherExecutorName = executor.fullName;
            contentData.otherExecutorApplying = declarationContent.optionRenunciated.replace('{deceasedName}', sessionData.deceased.deceasedName);
            sessionData.executors.list.push(executor);

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.testContent(done, contentToExclude, contentData);
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has no other names and there are codicils (toggle on)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'Yes';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.featureToggles = {
                main_applicant_alias: true
            };
            contentData.applicantWillName = 'Robert Bruce';
            contentData.applicantCurrentNameSign = 'Robert Bruce';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has no other names and there are codicils (toggle off)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'Yes';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.featureToggles = {
                main_applicant_alias: false
            };
            contentData.applicantWillName = 'Bob Smith';
            contentData.applicantCurrentNameSign = 'Bob smith';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has no other names and there are no codicils (toggle on)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName-codicils',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign-codicils',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'No';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.featureToggles = {
                main_applicant_alias: true
            };
            contentData.applicantWillName = 'Robert Bruce';
            contentData.applicantCurrentNameSign = 'Robert Bruce';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has no other names and there are no codicils (toggle off)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName-codicils',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign-codicils',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'No';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.featureToggles = {
                main_applicant_alias: false
            };
            contentData.applicantWillName = 'Bob Smith';
            contentData.applicantCurrentNameSign = 'Bob Smith';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has one other names and there are codicils (toggle on)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'Yes';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.deceased.otherNames = {
                name_0: {
                    firstName: 'James',
                    lastName: 'Miller'
                }
            };
            sessionData.featureToggles = {
                main_applicant_alias: true
            };
            contentData.applicantWillName = 'Robert Bruce';
            contentData.applicantCurrentNameSign = 'Robert Bruce';
            contentData.deceasedOtherNames = 'James Miller';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has one other names and there are codicils (toggle off)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'Yes';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.deceased.otherNames = {
                name_0: {
                    firstName: 'James',
                    lastName: 'Miller'
                }
            };
            sessionData.featureToggles = {
                main_applicant_alias: false
            };
            contentData.applicantWillName = 'Bob Smith';
            contentData.applicantCurrentNameSign = 'Bob Smith';
            contentData.deceasedOtherNames = 'James Miller';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has one other names and there are no codicils (toggle on)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName-codicils',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign-codicils',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'No';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.deceased.otherNames = {
                name_0: {
                    firstName: 'James',
                    lastName: 'Miller'
                }
            };
            sessionData.featureToggles = {
                main_applicant_alias: true
            };
            contentData.applicantWillName = 'Robert Bruce';
            contentData.applicantCurrentNameSign = 'Robert Bruce';
            contentData.deceasedOtherNames = 'James Miller';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
                .end(() => {
                    testWrapper.agent.post('/prepare-session/form')
                        .send(sessionData)
                        .end(() => {
                            testWrapper.testContent(done, contentToExclude, contentData);
                        });
                });
        });

        it('test right content loaded on the page, applicant has an alias, deceased has one other names and there are no codicils (toggle off)', (done) => {
            const contentToExclude = [
                'deceasedOtherNames',
                'executorApplyingName',
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
                'applicantName-codicils',
                'applicantName-multipleApplicants',
                'applicantName-multipleApplicants-alias',
                'applicantName-multipleApplicants-codicils',
                'applicantName-multipleApplicants-alias-codicils',
                'applicantName-multipleApplicants-mainApplicant',
                'applicantName-multipleApplicants-mainApplicant-alias',
                'applicantName-multipleApplicants-mainApplicant-codicils',
                'applicantName-multipleApplicants-mainApplicant-alias-codicils',
                'applicantSign-codicils',
                'applicantSign-multipleApplicants',
                'applicantSign-multipleApplicants-codicils',
                'applicantSign-multipleApplicants-mainApplicant',
                'applicantSign-multipleApplicants-mainApplicant-codicils',
                'declarationConfirm-multipleApplicants',
                'declarationRequests-multipleApplicants',
                'declarationUnderstand-multipleApplicants',
                'declarationUnderstandItem1-multipleApplicants',
                'declarationUnderstandItem2-multipleApplicants',
                'submitWarning-multipleApplicants'
            ];
            sessionData.will.codicils = 'No';
            sessionData.applicant.nameAsOnTheWill = 'No';
            sessionData.applicant.alias = 'Robert Bruce';
            sessionData.applicant.aliasReason = 'other';
            sessionData.applicant.otherReason = 'Legal Name Change';
            sessionData.executors.list[0].alias = 'Robert Bruce';
            sessionData.deceased.otherNames = {
                name_0: {
                    firstName: 'James',
                    lastName: 'Miller'
                }
            };
            sessionData.featureToggles = {
                main_applicant_alias: false
            };
            contentData.applicantWillName = 'Bob Smith';
            contentData.applicantCurrentNameSign = 'Bob smith';
            contentData.deceasedOtherNames = 'James Miller';

            testWrapper.agent.post('/prepare-session/featureToggles')
                .send(sessionData.featureToggles)
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
    describe('Verify Legal Declaration Object is built', () => {
        it('test legal declaration object populated', (done) => {

            testWrapper.agent.post('/prepare-session/form')
                .send(sessionData)
                .end(() => {
                    testWrapper.agent.get(testWrapper.pageUrl)
                        .then(response => {
                            let legalDeclarationObj = testWrapper.getStep().buildLegalDeclarationFromHtml(response.text);
                            assert.exists(legalDeclarationObj);
                            assert.isArray(legalDeclarationObj.headers, 'Headers exists');
                            assert.lengthOf(legalDeclarationObj.headers, 3, 'Headers array has length of 3');
                            assert.equal(legalDeclarationObj.headers[0], 'In the High Court of Justice');
                            assert.equal(legalDeclarationObj.headers[1], 'Family Division');
                            assert.equal(legalDeclarationObj.headers[2], '(Probate)');

                            assert.isArray(legalDeclarationObj.sections, 'Sections exists');
                            assert.lengthOf(legalDeclarationObj.sections, 5, 'Sections array has length of 5');

                            let legalStatementSection = legalDeclarationObj.sections[0];
                            assert.equal(legalStatementSection.title, 'Legal statement');
                            assert.isArray(legalStatementSection.declarationItems, 'Legal Section Dec items exists');
                            assert.lengthOf(legalStatementSection.declarationItems, 1, 'Dec Items array has length of 1');
                            assert.equal(legalStatementSection.declarationItems[0].title, 'I, Bob Smith of Flat 1, Somewhere Rd, Nowhere., make the following statement:');

                            let thePersonWhoDiedSection = legalDeclarationObj.sections[1];
                            assert.equal(thePersonWhoDiedSection.title, 'The person who died');
                            assert.isArray(thePersonWhoDiedSection.declarationItems, 'Legal Section Dec items exists');
                            assert.lengthOf(thePersonWhoDiedSection.declarationItems, 1, 'Dec Items array has length of 1');
                            assert.equal(thePersonWhoDiedSection.declarationItems[0].title, 'Someone Else was born on 1 February 1900 and died on 1 February 2000, domiciled in England and Wales. ');

                            let estateSection = legalDeclarationObj.sections[2];
                            assert.equal(estateSection.title, 'The estate of the person who died');
                            assert.isArray(estateSection.declarationItems, 'Estate Section Dec items exists');
                            assert.lengthOf(estateSection.declarationItems, 2, 'Dec Items array has length of 2');
                            assert.equal(estateSection.declarationItems[0].title, 'The gross value for the estate amounts to £150000 and the net value for the estate amounts to £100000.');
                            assert.equal(estateSection.declarationItems[1].title,'To the best of my knowledge, information and belief, there was no land vested in Someone Else which was settled previously to the death (and not by the will) of Someone Else and which remained settled land notwithstanding such death.');

                            let executorsSection = legalDeclarationObj.sections[3];
                            assert.equal(executorsSection.title, 'Executors applying for probate');
                            assert.isArray(executorsSection.declarationItems, 'Executors Section Dec items exists');
                            assert.lengthOf(executorsSection.declarationItems, 2, 'Dec Items array has length of 2');
                            assert.equal(executorsSection.declarationItems[0].title, 'I am an executor named in the will as Bob Smith, and I am applying for probate.');
                            assert.equal(executorsSection.declarationItems[1].title,'I will sign and send to the probate registry what I believe to be the true and original last will and testament of Someone Else.');

                            let declarationSection = legalDeclarationObj.sections[4];
                            assert.equal(declarationSection.title, 'Declaration');
                            assert.isArray(declarationSection.declarationItems, 'Declaration Section Dec items exists');
                            assert.lengthOf(declarationSection.declarationItems, 3, 'Dec Items array has length of 3');
                            assert.equal(declarationSection.declarationItems[0].title, 'I confirm that we will administer the estate of Someone Else, according to law. I will:');
                            assert.isArray(declarationSection.declarationItems[0].values, 'Declaration value items exists');
                            assert.lengthOf(declarationSection.declarationItems[0].values, 3, 'Dec value items array has length of 3');
                            assert.equal(declarationSection.declarationItems[0].values[0],'collect the whole estate');
                            assert.equal(declarationSection.declarationItems[0].values[1],'keep full details (an inventory) of the estate');
                            assert.equal(declarationSection.declarationItems[0].values[2],'keep a full account of how the estate has been administered');

                            assert.equal(declarationSection.declarationItems[1].title, 'If the probate registry (court) asks me to do so, I will:');
                            assert.isArray(declarationSection.declarationItems[1].values, 'Declaration value items exists');
                            assert.lengthOf(declarationSection.declarationItems[1].values, 2, 'Dec value items array has length of 2');
                            assert.equal(declarationSection.declarationItems[1].values[0],'provide the full details of the estate and how it has been administered');
                            assert.equal(declarationSection.declarationItems[1].values[1],'return the grant of probate to the court');

                            assert.equal(declarationSection.declarationItems[2].title, 'I understand that:');
                            assert.isArray(declarationSection.declarationItems[2].values, 'Declaration value items exists');
                            assert.lengthOf(declarationSection.declarationItems[2].values, 2, 'Dec value items array has length of 2');
                            assert.equal(declarationSection.declarationItems[2].values[0],'my application will be rejected if I do not answer any questions about the information I have given');
                            assert.equal(declarationSection.declarationItems[2].values[1],'criminal proceedings for fraud may be brought against me if I am found to have been deliberately untruthful or dishonest');
                            done();
                        })
                        .catch(err => {
                            done(err);
                        });
                });
        });
    });
});
