'use strict';

const FormatName = require('app/utils/FormatName');
const WillWrapper = require('app/wrappers/Will');

class ProbateDeclarationFactory {

    static build(ctx, content, formdata) {
        const hasCodicils = (new WillWrapper(formdata.will)).hasCodicils();
        const codicilsNumber = (new WillWrapper(formdata.will)).codicilsNumber();
        const executorsApplying = ctx.executorsWrapper.executorsApplying();
        const executorsNotApplying = ctx.executorsWrapper.executorsNotApplying();
        const hasMultipleApplicants = ctx.executorsWrapper.hasMultipleApplicants();
        const multipleApplicantSuffix = this.multipleApplicantSuffix(hasMultipleApplicants);

        const legalStatement = {
            intro: content[`intro${multipleApplicantSuffix}`]
                .replace('{applicantName}', formdata.applicant.applicantName),
            applicant: content[`legalStatementApplicant${multipleApplicantSuffix}`]
                .replace('{detailsOfApplicants}', FormatName.formatMultipleNamesAndAddress(executorsApplying, content, formdata.applicant.applicantAddress))
                .replace('{applicantName}', formdata.applicant.applicantName)
                .replace('{applicantAddress}', formdata.applicant.applicantAddress.formattedAddress),
            deceased: content.legalStatementDeceased
                .replace('{deceasedName}', formdata.deceased.deceasedName)
                .replace('{deceasedAddress}', formdata.deceased.deceasedAddress.formattedAddress)
                .replace('{deceasedDob}', formdata.deceased.dob_formattedDate)
                .replace('{deceasedDod}', formdata.deceased.dod_formattedDate),
            deceasedOtherNames: formdata.deceased.deceasedOtherNames ? content.deceasedOtherNames.replace('{deceasedOtherNames}', formdata.deceased.deceasedOtherNames) : '',
            executorsApplying: this.executorsApplying(hasMultipleApplicants, executorsApplying, content, hasCodicils, codicilsNumber, formdata.deceased.deceasedName, formdata.applicant.applicantName),
            deceasedEstateValue: content.deceasedEstateValue
                .replace('{ihtGrossValue}', formdata.iht.ihtGrossValue)
                .replace('{ihtNetValue}', formdata.iht.ihtNetValue),
            deceasedEstateLand: content[`deceasedEstateLand${multipleApplicantSuffix}`]
                .replace(/{deceasedName}/g, formdata.deceased.deceasedName),
            executorsNotApplying: this.executorsNotApplying(executorsNotApplying, content, formdata.deceased.deceasedName, hasCodicils)
        };

        const declaration = {
            confirm: content[`declarationConfirm${multipleApplicantSuffix}`]
                .replace('{deceasedName}', formdata.deceased.deceasedName),
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

        return {legalStatement, declaration};
    }
}

module.exports = ProbateDeclarationFactory;
