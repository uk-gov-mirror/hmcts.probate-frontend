'use strict';
const ValidationStep = require('app/core/steps/ValidationStep');
const FormatName = require('app/utils/FormatName');
const content = require('app/resources/en/translation/iht/assetsoutside');

class AssetsOutside extends ValidationStep {

    static getUrl() {
        return '/assets-outside-england-wales';
    }

    getContextData(req) {
        const ctx = super.getContextData(req);
        const formdata = req.session.form;
        ctx.deceasedName = FormatName.format(formdata.deceased);
        return ctx;
    }

    nextStepOptions() {
        return {
            options: [
                {key: 'assetsOutside', value: content.optionYes, choice: 'hasAssetsOutside'}
            ]
        };
    }

    clearFormData(ctx, sessionForm, fieldToCheckSection) {
        const fieldToCheck = 'assetsOutside';
        const dataToClear = {
            netValueAssetsOutsideField: 'iht.netValueAssetsOutsideField',
            netValueAssetsOutside: 'iht.netValueAssetsOutside'
        };

        return super.clearFormData(ctx, sessionForm, fieldToCheckSection, fieldToCheck, dataToClear);
    }
}

module.exports = AssetsOutside;
