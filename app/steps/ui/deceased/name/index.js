'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');
const BilingualGOP = require('app/steps/ui/language');

class DeceasedName extends ValidationStep {

    static getUrl() {
        return '/deceased-name';
    }

    static getPreviousUrl() {
        return BilingualGOP.getUrl();
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.index;
        return [ctx, formdata];
    }
}

module.exports = DeceasedName;
