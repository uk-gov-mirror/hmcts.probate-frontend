'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const FormatName = require('../../../../utils/FormatName');

class DeceasedAliasNameOnWill extends ValidationStep {

    static getUrl() {
        return '/deceased-alias-name-on-will';
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        ctx.aliasNameOnWill = FormatName.formatAliasNameOnWIll(formdata.deceased);
        return [ctx, formdata];
    }
}

module.exports = DeceasedAliasNameOnWill;
