'use strict';

const WithLinkStepRunner = require('app/core/runners/WithLinkStepRunner');
const ValidationStep = require('app/core/steps/ValidationStep');
const FieldError = require('app/components/error');
const config = require('app/config');
const ServiceMapper = require('app/utils/ServiceMapper');
const Security = require('app/services/Security');
const Authorise = require('app/services/Authorise');
const logger = require('app/components/logger')('Init');

class PinPage extends ValidationStep {

    static getUrl () {
        return '/sign-in';
    }

    runner() {
        return new WithLinkStepRunner();
    }

    * handlePost(ctx, errors, formdata, session) {
        if (parseInt(session.pin) !== parseInt(ctx.pin)) {
            errors.push(FieldError('pin', 'incorrect', this.resourcePath, this.generateContent()));
        } else {
            const authorise = new Authorise(config.services.idam.s2s_url, ctx.sessionID);
            const serviceAuthResult = yield authorise.post();
            if (serviceAuthResult.name === 'Error') {
                logger.info(`serviceAuthResult Error = ${serviceAuthResult}`);
                const keyword = 'failure';
                errors.push(FieldError('authorisation', keyword, this.resourcePath, ctx));
                return [ctx, errors];
            }
            const security = new Security();
            const authToken = yield security.getUserToken();
            if (authToken.name === 'Error') {
                logger.info(`failed to obtain authToken = ${serviceAuthResult}`);
                errors.push(FieldError('authorisation', 'failure', this.resourcePath, ctx));
                return;
            }

            const formData = ServiceMapper.map(
                'FormData',
                [config.services.orchestrator.url, ctx.sessionID]
            );
            yield formData.get(session.formdataId, authToken, serviceAuthResult, ctx.caseType)
                .then(result => {
                    if (result.name === 'Error') {
                        throw new ReferenceError('Error getting data for the co-applicant');
                    } else {
                        delete result.formdata.declaration.declarationCheckbox;
                        session.form = result.formdata;
                    }
                });
        }
        return [ctx, errors];
    }
}

module.exports = PinPage;
