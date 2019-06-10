/* eslint-disable no-lonely-if */
/* eslint-disable max-depth */

'use strict';

const {get} = require('lodash');
const config = require('app/config');
const contentMaritalStatus = require('app/resources/en/translation/deceased/maritalstatus');
const contentRelationshipToDeceased = require('app/resources/en/translation/applicant/relationshiptodeceased');
const contentAnyChildren = require('app/resources/en/translation/deceased/anychildren');
const contentAnyOtherChildren = require('app/resources/en/translation/deceased/anyotherchildren');

class IntestacyDeclarationFactory {

    static build(ctx, content, formdata) {
        const legalStatement = {
            intro: content.intro,
            applicant: content.legalStatementApplicant
                .replace('{applicantName}', formdata.applicantName)
                .replace('{applicantAddress}', formdata.applicantAddress.formattedAddress),
            deceased: content.intestacyLegalStatementDeceased
                .replace('{deceasedName}', formdata.deceasedName)
                .replace('{deceasedAddress}', formdata.deceasedAddress.formattedAddress)
                .replace('{deceasedDob}', formdata.dob_formattedDate)
                .replace('{deceasedDod}', formdata.dod_formattedDate),
            deceasedOtherNames: formdata.deceasedOtherNames ? content.deceasedOtherNames.replace('{deceasedOtherNames}', formdata.deceasedOtherNames) : '',
            deceasedMaritalStatus: content.intestacyDeceasedMaritalStatus
                .replace('{deceasedMaritalStatus}', get(formdata.deceased, 'maritalStatus', '').toLowerCase()),
            deceasedChildren: content.intestacyDeceasedChildren,
            deceasedEstateValue: content.deceasedEstateValue
                .replace('{ihtGrossValue}', formdata.ihtGrossValue)
                .replace('{ihtNetValue}', formdata.ihtNetValue),
            deceasedEstateLand: content.intestacyDeceasedEstateLand
                .replace(/{deceasedName}/g, formdata.deceasedName),
            applying: content.intestacyLettersOfAdministration
                .replace('{deceasedName}', formdata.deceasedName)
        };

        if (formdata.maritalStatus === contentMaritalStatus.optionMarried) {
            if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionSpousePartner) {
                if ((formdata.hadChildren === contentAnyChildren.optionNo) || (formdata.ihtNetValue <= config.assetsValueThreshold)) {
                    legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseApplyingHadNoChildrenOrEstateLessThan250k;
                } else {
                    legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseApplyingHadChildren;
                }
            } else {
                if (formdata.ihtNetValue <= config.assetsValueThreshold) {
                    if (formdata.anyOtherChildren === contentAnyOtherChildren.optionYes) {
                        if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsAdopted;
                        } else {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasSiblingsIsNotAdopted;
                        }
                    } else {
                        if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsAdopted;
                        } else {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateLessThan250kHasNoSiblingsIsNotAdopted;
                        }
                    }
                } else {
                    if (formdata.anyOtherChildren === contentAnyOtherChildren.optionYes) {
                        if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsAdopted;
                        } else {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasSiblingsIsNotAdopted;
                        }
                    } else {
                        if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsAdopted;
                        } else {
                            legalStatement.applicant2 = content.intestacyDeceasedMarriedSpouseRenouncingChildApplyingEstateMoreThan250kHasNoSiblingsIsNotAdopted;
                        }
                    }
                }
            }
        } else {
            if (formdata.anyOtherChildren === contentAnyOtherChildren.optionYes) {
                if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                    legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsAdopted;
                } else {
                    legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasSiblingsIsNotAdopted;
                }
            } else {
                if (formdata.relationshipToDeceased === contentRelationshipToDeceased.optionAdoptedChild) {
                    legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsAdopted;
                } else {
                    legalStatement.applicant2 = content.intestacyDeceasedNotMarriedChildApplyingHasNoSiblingsIsNotAdopted;
                }
            }
        }
        legalStatement.applicant2 = legalStatement.applicant2
            .replace(/{deceasedName}/g, formdata.deceasedName);

        const declaration = {
            confirm: content.declarationConfirm
                .replace('{deceasedName}', formdata.deceasedName),
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

        return {legalStatement, declaration};
    }
}

module.exports = IntestacyDeclarationFactory;
