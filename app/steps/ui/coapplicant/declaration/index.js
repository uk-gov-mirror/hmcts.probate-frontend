'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const InviteData = require('app/services/InviteData');
const config = require('app/config');

class CoApplicantDeclaration extends ValidationStep {

    static getUrl() {
        return '/co-applicant-declaration';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.inviteId = req.session.inviteId;
        ctx.formdataId = req.session.formdataId;
        ctx.applicant = formdata.applicant;
        ctx.authToken = req.authToken;
        ctx.serviceAuthorization = req.session.serviceAuthorization;
        Object.assign(ctx, formdata.declaration);
        return ctx;
    }

    nextStepOptions() {
        const nextStepOptions = {
            options: [
                {key: 'agreement', value: 'optionYes', choice: 'agreed'}
            ]
        };
        return nextStepOptions;
    }

    * handlePost(ctx, errors) {
        const data = {
            inviteId: ctx.inviteId,
            agreed: ctx.agreement === 'optionYes'
        };
        const inviteData = new InviteData(config.services.orchestrator.url, ctx.sessionID);

        yield inviteData.setAgreedFlag(ctx.formdataId, data)
            .then(result => {
                if (result.name === 'Error') {
                    throw new ReferenceError('Error updating co-applicant\'s data');
                }
            });

        return [ctx, errors];
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.inviteId;
        delete ctx.formdataId;
        delete ctx.applicant;
        delete ctx.declaration;
        delete ctx.serviceAuthorization;
        delete ctx.authToken;
        return [ctx, formdata];
    }
}

module.exports = CoApplicantDeclaration;
