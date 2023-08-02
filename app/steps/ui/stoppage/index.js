'use strict';

const Step = require('app/core/steps/Step');
const DeathCertificate = require('app/steps/ui/screeners/deathcertificate');

class StopPage extends Step {

    static getUrl(reason = '*') {
        return `/stop-page/${reason}`;
    }

    static getPreviousUrl(req) {
        const reason = req.params[0];
        const stopUrl = `/stop-page/${reason}`;
        let previousUrl;
        switch (stopUrl) {
        case '/stop-page/deathCertificate':
            previousUrl = DeathCertificate.getUrl();
            break;
        case '/stop-page/notInEnglandOrWales':
            previousUrl = '/deceased-domicile';
            break;
        case '/stop-page/eeEstateNotValued':
            previousUrl = '/ee-estate-valued';//Need to add more case where stop page is coming.Just added 3 for testing
            break;
        default:
            previousUrl = '/';
        }
        return previousUrl;
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
            pageHeader = 'applyByPostHeader';
            break;
        case 'ihtNotCompleted':
            pageHeader = 'inheritanceHeader';
            break;
        case 'eeEstateNotValued':
            pageHeader = 'eeEstateValuedHeader';
            break;
        case 'notDiedAfterOctober2014':
            pageHeader = 'applyByPostHeader';
            break;
        case 'notRelated':
            pageHeader = 'applyByPostHeader';
            break;
        case 'otherApplicants':
            pageHeader = 'applyByPostHeader';
            break;
        case 'notOriginal':
            pageHeader = 'notOriginalHeader';
            break;
        case 'notExecutor':
            pageHeader = 'applyByPostHeader';
            break;
        case 'mentalCapacity':
            pageHeader = 'applyByPostHeader';
            break;
        default:
            pageHeader = 'defaultHeader';
        }

        return pageHeader;
    }
}

module.exports = StopPage;
