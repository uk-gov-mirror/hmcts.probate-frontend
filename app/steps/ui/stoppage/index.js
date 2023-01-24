'use strict';

const Step = require('app/core/steps/Step');

class StopPage extends Step {

    static getUrl(reason = '*') {
        return `/stop-page/${reason}`;
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        ctx.stopReason = req.params[0];

        const formdata = req.session.form;

        ctx.stoppageHeader = this.returnStopPageHeader(ctx.stopReason);

        const templateContent = this.generateContent(ctx, formdata, req.session.language)[ctx.stopReason];

        if (templateContent) {
            ctx.linkPlaceholders = this.replaceLinkPlaceholders(templateContent);
        }

        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.stopReason;
        delete ctx.linkPlaceholders;
        delete ctx.stoppageHeader;
        return [ctx, formdata];
    }

    replaceLinkPlaceholders(templateContent) {
        const linkPlaceholders = templateContent.match(/{(.*?)}/g);

        if (linkPlaceholders) {
            return linkPlaceholders.map(placeholder => placeholder.substr(1, placeholder.length - 2));
        }

        return [];
    }

    returnStopPageHeader(stopReason) {
        let pageHeader;
        switch (stopReason) {
        case 'deathCertificate':
            pageHeader = 'deathCertificateHeader';
            break;
        case 'deathCertificateTranslation':
            pageHeader = 'deathCertificateTranslationHeader';
            break;
        case 'notInEnglandOrWales':
            pageHeader = 'notInEnglandOrWalesHeader';
            break;
        case 'ihtNotCompleted':
            pageHeader = 'ihtNotCompletedHeader';
            break;
        case 'eeEstateNotValued':
            pageHeader = 'eeEstateValuedHeader';
            break;
        case 'notDiedAfterOctober2014':
            pageHeader = 'notDiedAfterOctober2014Header';
            break;
        case 'notRelated':
            pageHeader = 'notRelatedHeader';
            break;
        case 'otherApplicants':
            pageHeader = 'otherApplicantsHeader';
            break;
        case 'notOriginal':
            pageHeader = 'notOriginalHeader';
            break;
        case 'notExecutor':
            pageHeader = 'notExecutorHeader';
            break;
        case 'mentalCapacity':
            pageHeader = 'mentalCapacityHeader';
            break;
        default:
            pageHeader = 'defaultHeader';
        }

        return pageHeader;
    }
}

module.exports = StopPage;
