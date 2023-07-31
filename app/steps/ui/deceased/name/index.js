'use strict';

const ValidationStep = require('app/core/steps/ValidationStep');

class DeceasedName extends ValidationStep {

    static getUrl() {
        return '/deceased-name';
    }

    static getPreviousUrl() {
        return '/bilingual-gop';
    }

    action(ctx, formdata) {
        super.action(ctx, formdata);
        delete ctx.index;
        return [ctx, formdata];
    }
}

module.exports = DeceasedName;
