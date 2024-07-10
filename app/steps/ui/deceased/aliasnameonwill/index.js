'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FormatName = require('../../../../utils/FormatName');

class DeceasedAliasNameOnWill extends ValidationStep {

    static getUrl() {
        return '/deceased-alias-name-on-will';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.aliasNameOnWill = FormatName.formatAliasNameOnWIll(formdata.deceased);
        return ctx;
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        return [ctx, formdata];
    }
}

module.exports = DeceasedAliasNameOnWill;
