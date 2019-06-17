'use strict';

const setJourney = require('app/middleware/setJourney');
const ValidationStep = require('app/core/steps/ValidationStep');
const ExecutorsWrapper = require('app/wrappers/Executors');
const WillWrapper = require('app/wrappers/Will');
const RegistryWrapper = require('app/wrappers/Registry');
const ihtContent = require('app/resources/en/translation/iht/method');
const deceasedMaritalStatusContent = require('app/resources/en/translation/deceased/maritalstatus');
const relationshipToDeceasedContent = require('app/resources/en/translation/applicant/relationshiptodeceased');
const FormatCcdCaseId = require('app/utils/FormatCcdCaseId');

class Documents extends ValidationStep {

    static getUrl() {
        return '/documents';
    }

    handleGet(ctx, formdata) {
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        const willWrapper = new WillWrapper(formdata.will);
        const registryAddress = (new RegistryWrapper(formdata.registry)).address();
        const content = this.generateContent(ctx, formdata);

        ctx.registryAddress = registryAddress ? registryAddress : content.address;

        if (ctx.journeyType === 'gop') {
            ctx.hasCodicils = willWrapper.hasCodicils();
            ctx.codicilsNumber = willWrapper.codicilsNumber();
            ctx.hasMultipleApplicants = executorsWrapper.hasMultipleApplicants();
            ctx.hasRenunciated = executorsWrapper.hasRenunciated();
            ctx.executorsNameChangedByDeedPollList = executorsWrapper.executorsNameChangedByDeedPoll();
        } else {
            ctx.spouseRenouncing = formdata.deceased.maritalStatus === deceasedMaritalStatusContent.optionMarried && (formdata.applicant.relationshipToDeceased === relationshipToDeceasedContent.optionChild || formdata.applicant.relationshipToDeceased === relationshipToDeceasedContent.optionAdoptedChild);
        }

        ctx.is205 = formdata.iht && formdata.iht.method === ihtContent.optionPaper && formdata.iht.form === 'IHT205';
        ctx.ccdReferenceNumber = FormatCcdCaseId.format(formdata.ccdCase);

        return [ctx];
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.journeyType = setJourney.getJourneyName(req.session);
        return ctx;
    }
}

module.exports = Documents;
