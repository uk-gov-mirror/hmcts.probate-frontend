// eslint-disable-line max-lines
/* eslint-disable no-lonely-if */
/* eslint-disable max-depth */
/* eslint-disable complexity */

'use strict';

const setJourney = require('app/middleware/setJourney');
const ValidationStep = require('app/core/steps/ValidationStep');
const executorNotifiedContent = require('app/resources/en/translation/executors/notified');
const executorContent = require('app/resources/en/translation/executors/executorcontent');
const {get} = require('lodash');
const ExecutorsWrapper = require('app/wrappers/Executors');
const WillWrapper = require('app/wrappers/Will');
const FormatName = require('app/utils/FormatName');
const FormatAlias = require('app/utils/FormatAlias');
const LegalDocumentJSONObjectBuilder = require('app/utils/LegalDocumentJSONObjectBuilder');
const legalDocumentJSONObjBuilder = new LegalDocumentJSONObjectBuilder();
const InviteData = require('app/services/InviteData');
const config = require('app/config');
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const contentRelationshipToDeceased = require('app/resources/en/translation/applicant/relationshiptodeceased');
const contentAnyChildren = require('app/resources/en/translation/deceased/anychildren');
const contentAnyOtherChildren = require('app/resources/en/translation/deceased/anyotherchildren');

class Declaration extends ValidationStep {
    static getUrl() {
        return '/declaration';
    }

    pruneFormData(body, ctx) {
        if (body && Object.keys(body).length > 0 && !Object.keys(body).includes('declarationCheckbox')) {
            delete ctx.declarationCheckbox;
        }
        return ctx;
    }

    getContextData(req) {
        let ctx = super.getContextData(req);
        ctx = this.pruneFormData(req.body, ctx);
        ctx.isIntestacyJourney = setJourney.isIntestacyJourney(req.session);
        const formdata = req.session.form;

        if (!ctx.isIntestacyJourney) {
            ctx.executorsWrapper = new ExecutorsWrapper(formdata.executors);
            ctx.invitesSent = get(formdata, 'executors.invitesSent');
            ctx.hasMultipleApplicants = ctx.executorsWrapper.hasMultipleApplicants(get(formdata, 'executors.list'));
            ctx.executorsEmailChanged = ctx.executorsWrapper.hasExecutorsEmailChanged();
            ctx.hasExecutorsToNotify = ctx.executorsWrapper.hasExecutorsToNotify() && ctx.invitesSent === 'true';
        }

        const templateData = this.prepareDataForTemplate(ctx, this.generateContent(ctx, formdata), formdata);
        Object.assign(ctx, templateData);
        ctx.softStop = this.anySoftStops(formdata, ctx);
        return ctx;
    }

    prepareDataForTemplate(ctx, content, formdata) {
        let legalStatement;
        let declaration;
        const applicant = formdata.applicant || {};
        const applicantName = FormatName.format(applicant);
        const applicantAddress = get(applicant, 'address', {});

        const deceased = formdata.deceased || {};
        const deceasedName = FormatName.format(deceased);
        const deceasedAddress = get(deceased, 'address', {});
        const deceasedOtherNames = FormatName.formatMultipleNamesAndAddress(get(deceased, 'otherNames'), content);

        const iht = formdata.iht || {};
        const ihtGrossValue = iht.grossValue ? iht.grossValue.toFixed(2) : 0;
        const ihtNetValue = iht.netValue ? iht.netValue.toFixed(2) : 0;

        if (ctx.isIntestacyJourney) {
            legalStatement = {
                intro: content.intro,
                applicant: content.legalStatementApplicant
                    .replace('{applicantName}', applicantName)
                    .replace('{applicantAddress}', applicantAddress.formattedAddress),
                deceased: content.intestacyLegalStatementDeceased
                    .replace('{deceasedName}', deceasedName)
                    .replace('{deceasedAddress}', deceasedAddress.formattedAddress)
                    .replace('{deceasedDob}', deceased.dob_formattedDate)
                    .replace('{deceasedDod}', deceased.dod_formattedDate),
                deceasedOtherNames: deceasedOtherNames ? content.deceasedOtherNames.replace('{deceasedOtherNames}', deceasedOtherNames) : '',
                deceasedMaritalStatus: content.intestacyDeceasedMaritalStatus
                    .replace('{deceasedMaritalStatus}', deceased.maritalStatus),
                deceasedChildren: content.intestacyDeceasedChildren,
                deceasedEstateValue: content.deceasedEstateValue
                    .replace('{ihtGrossValue}', ihtGrossValue)
                    .replace('{ihtNetValue}', ihtNetValue),
                deceasedEstateLand: content.intestacyDeceasedEstateLand
                    .replace(/{deceasedName}/g, deceasedName),
                applying: content.intestacyLettersOfAdministration
                    .replace('{deceasedName}', deceasedName)
            };

            if (deceased.maritalStatus === contentMaritalStatus.optionMarried) {
                if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionSpousePartner) {
                    if ((deceased.hadChildren === contentAnyChildren.optionNo) || (ihtNetValue <= config.assetsValueThreshold)) {
                        legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseApplyingHadNoChildrenOrEstateLessThan250k;
                    } else {
                        legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseApplyingHadChildren;
                    }
                } else {
                    if (ihtNetValue <= config.assetsValueThreshold) {
                        if (deceased.anyOtherChildren === contentAnyOtherChildren.optionYes) {
                            if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsAdopted;
                            } else {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsNotAdopted;
                            }
                        } else {
                            if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsAdopted;
                            } else {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsNotAdopted;
                            }
                        }
                    } else {
                        if (deceased.anyOtherChildren === contentAnyOtherChildren.optionYes) {
                            if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsAdopted;
                            } else {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsNotAdopted;
                            }
                        } else {
                            if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsAdopted;
                            } else {
                                legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsNotAdopted;
                            }
                        }
                    }
                }
            } else {
                if (deceased.anyOtherChildren === contentAnyOtherChildren.optionYes) {
                    if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                        legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsAdopted;
                    } else {
                        legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsNotAdopted;
                    }
                } else {
                    if (applicant.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                        legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsAdopted;
                    } else {
                        legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsNotAdopted;
                    }
                }
            }
            legalStatement.applicant2 = legalStatement.applicant2
                .replace(/{deceasedName}/g, deceasedName);

            declaration = {
                confirm: content.declarationConfirm
                    .replace('{deceasedName}', deceasedName),
                confirmItem1: content.declarationConfirmItem1,
                confirmItem2: content.declarationConfirmItem2,
                confirmItem3: content['declarationConfirmItem3-intestacy'],
                requests: content.declarationRequests,
                requestsItem1: content['declarationRequestsItem1-intestacy'],
                requestsItem2: content['declarationRequestsItem2-intestacy'],
                understand: content.declarationUnderstand,
                understandItem1: content['declarationUnderstandItem1-intestacy'],
                understandItem2: content.declarationUnderstandItem2,
                accept: content.declarationCheckbox,
                submitWarning: content.submitWarning
            };
        } else {
            const hasCodicils = (new WillWrapper(formdata.will)).hasCodicils();
            const codicilsNumber = (new WillWrapper(formdata.will)).codicilsNumber();
            const executorsApplying = ctx.executorsWrapper.executorsApplying();
            const executorsNotApplying = ctx.executorsWrapper.executorsNotApplying();
            const hasMultipleApplicants = ctx.executorsWrapper.hasMultipleApplicants();
            const multipleApplicantSuffix = this.multipleApplicantSuffix(hasMultipleApplicants);

            legalStatement = {
                intro: content[`intro${multipleApplicantSuffix}`]
                    .replace('{applicantName}', applicantName),
                applicant: content[`legalStatementApplicant${multipleApplicantSuffix}`]
                    .replace('{detailsOfApplicants}', FormatName.formatMultipleNamesAndAddress(executorsApplying, content, applicantAddress))
                    .replace('{applicantName}', applicantName)
                    .replace('{applicantAddress}', applicantAddress.formattedAddress),
                deceased: content.legalStatementDeceased
                    .replace('{deceasedName}', deceasedName)
                    .replace('{deceasedAddress}', deceasedAddress.formattedAddress)
                    .replace('{deceasedDob}', deceased.dob_formattedDate)
                    .replace('{deceasedDod}', deceased.dod_formattedDate),
                deceasedOtherNames: deceasedOtherNames ? content.deceasedOtherNames.replace('{deceasedOtherNames}', deceasedOtherNames) : '',
                executorsApplying: this.executorsApplying(hasMultipleApplicants, executorsApplying, content, hasCodicils, codicilsNumber, deceasedName, applicantName),
                deceasedEstateValue: content.deceasedEstateValue
                    .replace('{ihtGrossValue}', ihtGrossValue)
                    .replace('{ihtNetValue}', ihtNetValue),
                deceasedEstateLand: content[`deceasedEstateLand${multipleApplicantSuffix}`]
                    .replace(/{deceasedName}/g, deceasedName),
                executorsNotApplying: this.executorsNotApplying(executorsNotApplying, content, deceasedName, hasCodicils)
            };

            declaration = {
                confirm: content[`declarationConfirm${multipleApplicantSuffix}`]
                    .replace('{deceasedName}', deceasedName),
                confirmItem1: content.declarationConfirmItem1,
                confirmItem2: content.declarationConfirmItem2,
                confirmItem3: content.declarationConfirmItem3,
                requests: content[`declarationRequests${multipleApplicantSuffix}`],
                requestsItem1: content.declarationRequestsItem1,
                requestsItem2: content.declarationRequestsItem2,
                understand: content[`declarationUnderstand${multipleApplicantSuffix}`],
                understandItem1: content[`declarationUnderstandItem1${multipleApplicantSuffix}`],
                understandItem2: content[`declarationUnderstandItem2${multipleApplicantSuffix}`],
                accept: content.declarationCheckbox,
                submitWarning: content[`submitWarning${multipleApplicantSuffix}`],
            };
        }

        return {legalStatement, declaration};
    }

    codicilsSuffix(hasCodicils) {
        return hasCodicils ? '-codicils' : '';
    }

    multipleApplicantSuffix(hasMultipleApplicants) {
        return hasMultipleApplicants ? '-multipleApplicants' : '';
    }

    executorsApplying(hasMultipleApplicants, executorsApplying, content, hasCodicils, codicilsNumber, deceasedName, mainApplicantName) {
        const multipleApplicantSuffix = this.multipleApplicantSuffix(hasMultipleApplicants);
        return executorsApplying.map(executor => {
            return this.executorsApplyingText(
                {
                    hasCodicils,
                    codicilsNumber,
                    hasMultipleApplicants,
                    content,
                    multipleApplicantSuffix,
                    executor,
                    deceasedName,
                    mainApplicantName
                });
        });
    }

    executorsApplyingText(props) {
        const mainApplicantSuffix = (props.hasMultipleApplicants && props.executor.isApplicant) ? '-mainApplicant' : '';
        const codicilsSuffix = this.codicilsSuffix(props.hasCodicils);
        const applicantNameOnWill = FormatName.formatName(props.executor);
        const applicantCurrentName = FormatName.formatName(props.executor, true);
        const aliasSuffix = props.executor.alias || props.executor.currentName ? '-alias' : '';
        const aliasReason = FormatAlias.aliasReason(props.executor, props.hasMultipleApplicants);
        const content = {
            name: props.content[`applicantName${props.multipleApplicantSuffix}${mainApplicantSuffix}${aliasSuffix}${codicilsSuffix}`]
                .replace('{applicantWillName}', props.executor.isApplicant && props.executor.alias ? FormatName.applicantWillName(props.executor) : props.mainApplicantName)
                .replace(/{applicantCurrentName}/g, applicantCurrentName)
                .replace('{applicantNameOnWill}', props.executor.hasOtherName ? ` ${props.content.as} ${applicantNameOnWill}` : '')
                .replace('{aliasReason}', aliasReason),
            sign: ''
        };
        if (props.executor.isApplicant) {
            content.sign = props.content[`applicantSend${props.multipleApplicantSuffix}${mainApplicantSuffix}${codicilsSuffix}`]
                .replace('{applicantName}', props.mainApplicantName)
                .replace('{deceasedName}', props.deceasedName);

            if (props.hasCodicils) {
                if (props.codicilsNumber === 1) {
                    content.sign = content.sign
                        .replace('{codicilsNumber}', '')
                        .replace('{codicils}', props.content.codicil);
                } else {
                    content.sign = content.sign
                        .replace('{codicilsNumber}', props.codicilsNumber)
                        .replace('{codicils}', props.content.codicils);
                }
            }
        }
        return content;
    }

    executorsNotApplying(executorsNotApplying, content, deceasedName, hasCodicils) {
        return executorsNotApplying.map(executor => {
            return content[`executorNotApplyingReason${this.codicilsSuffix(hasCodicils)}`]
                .replace('{otherExecutorName}', FormatName.formatName(executor))
                .replace('{otherExecutorApplying}', this.executorsNotApplyingText(executor, content))
                .replace('{deceasedName}', deceasedName);
        });
    }

    executorsNotApplyingText(executor, content) {
        if (Object.keys(executorContent).includes(executor.notApplyingKey)) {
            let executorApplyingText = content[executor.notApplyingKey];

            if (executor.executorNotified === executorNotifiedContent.optionYes) {
                executorApplyingText += ` ${content.additionalExecutorNotified}`;
            }

            return executorApplyingText;
        }
    }

    nextStepOptions(ctx) {
        ctx.hasDataChangedAfterEmailSent = ctx.hasDataChanged && ctx.invitesSent === 'true';
        ctx.hasEmailChanged = ctx.executorsEmailChanged && ctx.invitesSent === 'true';
        const nextStepOptions = {
            options: [
                {key: 'hasExecutorsToNotify', value: true, choice: 'sendAdditionalInvites'},
                {key: 'hasEmailChanged', value: true, choice: 'executorEmailChanged'},
                {key: 'hasDataChangedAfterEmailSent', value: true, choice: 'dataChangedAfterEmailSent'},
                {key: 'hasMultipleApplicants', value: true, choice: 'otherExecutorsApplying'}
            ]
        };
        return nextStepOptions;
    }

    resetAgreedFlags(ctx) {
        const data = {agreed: null};
        const inviteData = new InviteData(config.services.persistence.url, ctx.sessionID);
        const promises = ctx.executorsWrapper
            .executorsInvited()
            .map(exec => inviteData.patch(exec.inviteId, data));
        return Promise.all(promises);
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.isIntestacyJourney;
        delete ctx.hasMultipleApplicants;

        if (ctx.hasDataChanged === true) {
            this.resetAgreedFlags(ctx);
        }

        delete ctx.executorsWrapper;
        delete ctx.hasDataChanged;
        delete ctx.hasExecutorsToNotify;
        delete ctx.executorsEmailChanged;
        delete ctx.hasDataChangedAfterEmailSent;
        delete ctx.invitesSent;
        return [ctx, formdata];
    }

    renderPage(res, html) {
        const formdata = res.req.session.form;
        formdata.legalDeclaration = legalDocumentJSONObjBuilder.build(formdata, html);
        res.send(html);
    }
}

module.exports = Declaration;
