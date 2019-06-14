'use strict';

const setJourney = require('app/middleware/setJourney');
const ValidationStep = require('app/core/steps/ValidationStep');
const ExecutorsWrapper = require('app/wrappers/Executors');
const WillWrapper = require('app/wrappers/Will');
const RegistryWrapper = require('app/wrappers/Registry');
const ihtContent = require('app/resources/en/translation/iht/method');
const FormatCcdCaseId = require('app/utils/FormatCcdCaseId');

class Documents extends ValidationStep {

    static getUrl() {
        return '/documents';
    }

    handleGet(ctx, formdata) {
        const executorsWrapper = new ExecutorsWrapper(formdata.executors);
        const registryAddress = (new RegistryWrapper(formdata.registry)).address();
        const content = this.generateContent(ctx, formdata);

        ctx.registryAddress = registryAddress ? registryAddress : content.address;

        if (ctx.journeyType === 'gop') {
            ctx.hasCodicils = (new WillWrapper(formdata.will)).hasCodicils();
            ctx.codicilsNumber = (new WillWrapper(formdata.will)).codicilsNumber();
            ctx.hasMultipleApplicants = executorsWrapper.hasMultipleApplicants();
            ctx.hasRenunciated = executorsWrapper.hasRenunciated();
            ctx.executorsNameChangedByDeedPollList = executorsWrapper.executorsNameChangedByDeedPoll();
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
